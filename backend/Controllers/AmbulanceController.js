const { warnEnvConflicts } = require("@prisma/client/runtime/library");
const prisma = require("../prisma/prismaClient");
const haversine = require("../Utils/calculateDistance");
const { default: axios } = require("axios");


const ambulanceRequest = async (req, res) => {
    const { aidCarType, selectedItems } = req.body;

    const patientId = req.userId

    console.log("User id is", patientId);


    try {
        // Fetch the patient's location
        const patient = await prisma.patient.findUnique({
            where: { id: patientId },
        });
        console.log("Patient location is", patient.permanentLocation);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        //   const { lat: patientLat, lng: patientLng } = patient.permanentLocation;
        //   const [patientLat,patientLng] = patient.permanentLocation
        //   console.log("Patient location is",patientLat,patientLng);
        const { permanentLocation } = patient;

        // Validate permanentLocation as an array
        if (!Array.isArray(permanentLocation) || permanentLocation.length !== 2) {
            return res
                .status(400)
                .json({ message: 'Patient location is invalid or not properly formatted' });
        }

        const [patientLat, patientLng] = permanentLocation;

        // console.log(`Patient location is ${patientLat}, ${patientLng}`);

        // Fetch available ambulances of the specified type
        const ambulances = await prisma.ambulance.findMany({
            where: {
                type: aidCarType,
                status: 'available',
            },
        });
        // console.log("Available ambulances",ambulances);


        if (!ambulances.length) {
            return res.status(404).json({ message: 'No ambulances available' });
        }



        // Find the nearest ambulance
        let nearestAmbulance = null;
        let minDistance = Infinity;

        ambulances.forEach((ambulance) => {

            // const { location } = ambulance;

            // // Validate permanentLocation as an array
            // if (!Array.isArray(location) || location.length !== 2) {
            //     return res
            //         .status(400)
            //         .json({ message: 'ambulance location is invalid or not properly formatted' });
            // }

            // const [ambulanceLat, ambulanceLng] = location;

            // console.log(`ambulance location is ${ambulanceLat}, ${ambulanceLng}`);

            // const { lat: ambulanceLat, lng: ambulanceLng } = ambulance.location;
            // console.log("Ambulance location is",ambulance.location);

            // const [ambulanceLat, ambulanceLng] = ambulance.location;
            const { latitude: ambulanceLat, longitude: ambulanceLng } = ambulance.location;

            if (ambulanceLat === undefined || ambulanceLng === undefined) {
                console.error(`Ambulance location is missing: ${JSON.stringify(ambulance)}`);
                return;
            }
            const distance = haversine.calculateDistance(
                patientLat,
                patientLng,
                ambulanceLat,
                ambulanceLng
            );

            console.log(
                `Ambulance: ${ambulance.name}, Location: ${ambulanceLat}, ${ambulanceLng}, Distance: ${distance}`
            );

            // console.log("Ambulance", ambulance);


            if (distance < minDistance) {
                minDistance = distance;
                nearestAmbulance = ambulance;
            }
            console.log("distance is", distance);

        });

        // If no nearest ambulance is found, return an error
        if (!nearestAmbulance) {
            return res.status(404).json({ message: 'No suitable ambulances found' });
        }

        // Create an ambulance request
        const request = await prisma.ambulanceRequest.create({
            data: {
                patientId: patient.id,
                aidCarType,
                selectedItems,
                ambulanceId: nearestAmbulance.id,
                status: 'pending',
            },
        });

        // Update the ambulance's status
        await prisma.ambulance.update({
            where: { id: nearestAmbulance.id },
            data: { status: 'on_route' },
        });

        res.status(201).json({
            message: 'Ambulance request created successfully',
            request,
            ambulance: nearestAmbulance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}


const createAmbulance = async (req, res) => {
    const { name, licenseNumber, location, type, owner, status } = req.body;

    try {
        const newAmbulance = await prisma.ambulance.create({
            data: {
                name,
                licenseNumber,
                location,
                type,
                owner,
                status: "available"
            }
        })

        res.status(201).json({
            message: "Ambulance created",
            newAmbulance,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const trackAmbulance = async (req, res) => {
    const { requestId } = req.params;
    const patientId = req.userId;

    try {
        const request = await prisma.ambulanceRequest.findUnique({
            where: {
                id: requestId
            },
            include: {
                ambulance: true,
                patient: true,
            }
        })

        const patient = await prisma.patient.findUnique({
            where: {
                id: patientId
            }
        })


        if (!request || !request.ambulance) {
            res.status(404).json({ message: "Ambulance not found" });
        }

        const { permanentLocation } = patient;

        const { location: ambulanceLocation } = request.ambulance;
        console.log("ambulance location", ambulanceLocation);

        const [patientLat, patientLng] = permanentLocation;
        console.log("Patient location", patientLat, patientLng);


        if (!ambulanceLocation || !patientLat || !patientLng) {
            res.status(404).json({ message: "Ambulance or patient location not found" });
        }

        // const [ambulanceLat, ambulanceLng] = ambulanceLocation.split(',').map(Number);
        let ambulanceLat, ambulanceLng;

        // Handle location format
        if (typeof ambulanceLocation === 'string') {
            [ambulanceLat, ambulanceLng] = ambulanceLocation.split(',').map(Number);
        } else if (typeof ambulanceLocation === 'object') {
            ({ latitude: ambulanceLat, longitude: ambulanceLng } = ambulanceLocation);
        } else {
            return res.status(500).json({ message: 'Invalid ambulance location format' });
        }

        const distance = haversine.calculateDistance(
            patientLat,
            patientLng,
            ambulanceLat,
            ambulanceLng,
        )

        const getLocationName = async (latitude, longitude) => {
            console.log("in geo location");

            const API_KEY = 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao'; // Replace with your actual API key
            const url = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyHvdSJ21dDHJhxVyW8Sb-CX77sLSM82UxT&libraries=geometry,places&callback=initMap`;

            try {
                const response = await axios.get(url);
                console.log('Google Maps API response:', response.data); // Log the response for debugging

                const results = response.data.results;

                if (results && results.length > 0) {
                    return results[0].formatted_address; // Return the first result's formatted address
                }

                return 'Unknown location'; // Return default message if no results found
            } catch (error) {
                console.error('Error fetching location name:', error.message);
                return 'Unknown location'; // Return default message in case of an error
            }
        };


        const ambulanceLocationName = await getLocationName(ambulanceLat, ambulanceLng);
        const patientLoctionName = await getLocationName(patientLat, patientLng);

        res.status(200).json({
            ambulanceLocation: {
                address: ambulanceLocationName
            },
            patientLocation: {
                address: patientLoctionName
            },
            location: { latitude: ambulanceLat, longitude: ambulanceLng },
            distance: `${distance.toFixed(2)} Km`,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllAmbulances = async (req, res) => {
    const ambulances = await prisma.ambulance.findMany({
        select: {
            id: true,
            name: true,
            owner: true,
            location: true,
            type: true,
            status: true
        }
    });

    res.status(200).json(ambulances);
}

const getAllAmbulanceRequests = async (req, res) => {
    const patientId = req.userId;

    const user = await prisma.patient.findUnique({
        where: {
            id: patientId
        }
    })
    if (!user) {
        return res.status(404).json({message:"Login first"})
    }
    // const patientName = `${user.firstName}-${user.lastName}`
    const requests = await prisma.ambulanceRequest.findMany({
        where: {
            patientId: patientId
        },
        select: {
            aidCarType: true,
            status: true,

            ambulance:{
                select:{
                    owner:true,
                    name:true
                }
            },

            patient:{
                select:{
                    firstName:true,
                    lastName:true
                }
            }
        }
    })

    
    return res.status(200).json(requests)
}

const getAmbulanceById = async (req, res) => {
    const { ambulanceId } = req.params;

    const ambulance = await prisma.ambulance.findUnique({
        where: {
            id: ambulanceId
        }
    })

    res.status(200).json(ambulance);
}

const updateAmbulance = async (req, res) => {
    const { name, licenseNumber, location, type, owner, status } = req.body;
    const { ambulanceId } = req.params;

    const ambulance = await prisma.ambulance.findUnique({
        where: {
            id: ambulanceId
        }
    });

    if (!ambulance) {
        res.status(404).json({ message: "Ambulance not available" })
    }

    const updatedAmbulance = await prisma.ambulance.update({
        where: {
            id: ambulanceId
        },
        data: {
            name: name,
            licenseNumber: licenseNumber,
            location: location,
            type: type,
            owner: owner,
            status: status,
        }
    });

    res.status(201).json(updatedAmbulance)
}
module.exports = {
    ambulanceRequest,
    createAmbulance,
    trackAmbulance,
    getAllAmbulances,
    getAmbulanceById,
    updateAmbulance,
    getAllAmbulanceRequests,
}
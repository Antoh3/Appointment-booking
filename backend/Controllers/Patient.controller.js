const bcrypt = require('bcrypt');
const { generateToken,generateRefreshToken } = require('../Middlewares/JWT.authentication')
const prisma = require('../prisma/prismaClient')

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, birthDate,
                gender,idNumber,permanentLocation,password
         } = req.body;

        const existingUser = await prisma.patient.findUnique({
            where: {
                email: email,
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists!', status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 20)

        const newUser = await prisma.patient.create({
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                birthDate,
                gender,
                idNumber,
                permanentLocation,
                password: hashedPassword,
            },
        });

        // const token = generateToken(newUser)
        res.status(200).json({newUser,message:"User registered"});
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Controller function for patient registration
const registerPatient = async (req, res) => {
    try {
        // Log the incoming request body and user ID for debugging
        // console.log('User ID from token:', req.userId); 
        // console.log("User name from token",req.name);
        console.log(req.userRole);


        // Destructure fields from the request body
        const {
            name,
            email,
            phone,
            birthDate,
            gender,
            address,
            occupation,
            emergencyContactName,
            emergencyContactNumber,
            primaryPhysician,
            insuranceProvider,
            insurancePolicyNumber,
            allergies,
            currentMedication,
            familyMedicalHistory,
            pastMedicalHistory,
            identificationType,
            identificationNumber,
            privacyConsent,
        } = req.body;

        if (req.userRole !== 'patient') {
            return res.status(403).json({ message: 'Access forbidden' });
        }

        // Ensure userId is defined before proceeding
        if (!req.userId) {
            return res.status(400).json({ message: 'User ID not found in token' });
        }

        // Use req.userId to find the user and create the patient
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        });
        console.log("Logged in user", user);


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create patient associated with the logged-in user
        const newPatient = await prisma.patient.create({
            data: {
                // userId: req.userId, // Link to user via userId from token
                name: user.name || name, // Use user name if available, otherwise use provided name
                email: user.email || email, // Use user email if available, otherwise use provided email
                phone: user.phone || phone, // Use user phone if available, otherwise use provided phone
                birthDate: new Date(birthDate),
                gender,
                address,
                occupation,
                emergencyContactName,
                emergencyContactNumber,
                primaryPhysician,
                insuranceProvider,
                insurancePolicyNumber,
                allergies,
                currentMedication,
                familyMedicalHistory,
                pastMedicalHistory,
                identificationType,
                identificationNumber,
                identificationDocument: req.file ? req.file.path : null, // Use the path from req.file if it exists
                privacyConsent: privacyConsent === 'true', // Ensure it's a boolean
                user: {
                    connect: {
                        id: req.userId // Connect the user based on the userId
                    }
                },
            },
        });

        res.status(200).json({ message: 'Patient registered successfully', newPatient });
    } catch (error) {
        console.error('Error registering patient:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Controller function for patient login
const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await prisma.patient.findUnique({
            where: {
                email: email,
            },
        });
        
        

        // Check if the user exists
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const accessToken = generateToken(user.id, 'patient');
        const refreshToken = generateRefreshToken(user.id, 'patient')
        
        console.log(accessToken);
        
        //Set tokens in response headers
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.setHeader('x-refresh-token', refreshToken);
        // res.header('x-access-token', accessToken);
        // res.header('x-refresh-token', refreshToken);
        // console.log(req.userId,req.userRole);
        
        res.status(200).json({message: "Login succesfull",accessToken,refreshToken,});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" })
    }
};

// Controller function to get a patient by ID
const getPatientById = async (req, res) => {
    try {
        console.log('User ID from token:', req.userId);

        const patientId = req.userId;


        // Find the patient by ID
        const patient = await prisma.patient.findUnique({
            where: {
                id: patientId,
            }
        })



        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Send a success response with the patient data
        res.status(200).json(patient);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const searchDoctors = async (req, res) => {
    try {
        if (req.userRole !== 'patient') {
            return res.status(403).json({ message: 'Access forbidden: Only patients can search for doctors' });
        }

        const { specialization } = req.query;
        if (!specialization) {
            return res.status(404).json({ message: "Please provide doctor specialization" })
        }

        const doctors = await prisma.doctor.findMany({
            where: {
                specialization: {
                    contains: specialization,
                },
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                specialization: true
            },
        });

        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" })
        }

        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


// Controller function to update a appointment
const updateAppointment = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Check if the patient with the given ID exists
        const existingPatient = await prisma.patient.findUnique({
            where: {
                id: patientId
            }
        })

        if (!existingPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Extract updated patient data from req.body
        const {
            name, email, phone, birthDate, gender, address, occupation,
            emergencyContactName, emergencyContactNumber, primaryPhysician, insuranceProvider,
            insurancePolicyNumber, allergies, currentMedication, familyMedicalHistory,
            pastMedicalHistory, identificationType, identificationNumber, privacyConsent
        } = req.body;

        const identificationDocumentPath = req.file ? req.file.path : null;
        // Update the patient using findByIdAndUpdate
        const updatedPatient = await prisma.patient.update({
            where: {
                id: patientId
            },
            data: {
                name,
                email,
                phone,
                birthDate: new Date(birthDate),
                gender,
                address,
                occupation,
                emergencyContactName,
                emergencyContactNumber,
                primaryPhysician,
                insuranceProvider,
                insurancePolicyNumber,
                allergies,
                currentMedication,
                familyMedicalHistory,
                pastMedicalHistory,
                identificationType,
                identificationNumber,
                privacyConsent,
                identificationDocument: identificationDocumentPath, // Save file path
            }
        })

        // Send a success response with the updated patient data
        res.status(200).json(updatedPatient);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to delete a patient by ID
const deletePatientById = async (req, res) => {
    try {
        const patientId = req.userId;

        // Find the patient by ID
        const patient = await prisma.patient.findUnique({
            where: {
                userId: patientId
            }
        })

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Delete the patient from the database
        await prisma.patient.delete({
            where: {
                userId: patientId,
            }
        })

        // Send a success response
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//update patient appointments
const updatePatientById = async (req, res) => {
    try {
        const patientId = req.userId;
        const {
            name,
            email,
            phone,
            birthDate,
            gender,
            address,
            occupation,
            emergencyContactName,
            emergencyContactNumber,
            primaryPhysician,
            insuranceProvider,
            insurancePolicyNumber,
            allergies,
            currentMedication,
            familyMedicalHistory,
            pastMedicalHistory,
            identificationType,
            identificationNumber,
            privacyConsent,
        } = req.body;

        const identificationDocument = req.files?.identificationDocument?.[0]?.path;

        const updatePatient = await prisma.patient.update({
            where: {
                userId: patientId
            },
            data: {
                name,
                email,
                phone,
                birthDate: new Date(birthDate),
                gender,
                address,
                occupation,
                emergencyContactName,
                emergencyContactNumber,
                primaryPhysician,
                insuranceProvider,
                insurancePolicyNumber,
                allergies,
                currentMedication,
                familyMedicalHistory,
                pastMedicalHistory,
                identificationType,
                identificationNumber,
                identificationDocument: identificationDocument, // Use the path from req.file if it exists
                // identificationDocument: req.file ? req.file.path : null, // Use the path from req.file if it exists
                privacyConsent: privacyConsent === 'true '
            }
        })
        res.status(200).json({ message: 'patient updated successfully', updatePatient });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    searchDoctors,
    registerUser,
    registerPatient,
    loginPatient,
    getPatientById,
    updatePatientById,
    deletePatientById,
    updateAppointment
};

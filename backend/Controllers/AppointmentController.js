const prisma = require("../prisma/prismaClient");

// Create a new appointment
const createAppointment = async (req, res) => {

    if (req.userRole !== 'patient') {
        return res.status(403).json({ message: 'Access forbidden' });
    }

    const { doctorId, schedule, reason } = req.body

    const patientId = req.userId;
    console.log("user id is ", patientId);


    try {
        const doctor = await prisma.doctor.findUnique({
            where: {
                id: doctorId
            }
        })
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" })
        }


        const patient = await prisma.patient.findUnique({
            where: {
                id: patientId
            }
        })
        // console.log(`Patient name ${patient.firstName} ${patient.lastName}`);
        if (!patient) {
            return res.status(404).json({ message: "Please login" })
        }

        const name = `${patient.firstName}-${patient.lastName}`
        // console.log("Patient name",name);
        

        const appoinment = await prisma.appointment.create({
            data: {
                schedule: new Date(schedule),
                reason,
                status: "scheduled",
                // primaryPhysician,
                patientName: name,
                patientId: patient.id,
                doctorId: doctor.id
            }
        })

        res.status(200).json({ message: "Appointment booked", appoinment })
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Read a single appointment by ID
const getDoctorAppointmentById = async (req, res) => {
    try {
        if (req.userRole !== "doctor") {
            return res.status(403).json({ message: "Access forbidden only doctors can access" })
        }
        console.log(req.userId);

        const doctor = await prisma.doctor.findUnique({
            where: {
                id: req.userId
            }
        })
        console.log(doctor.id);

        if (!doctor) {
            return res.status(404).json({ message: "Please login" })
        }
        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId: doctor.id
            },
            select: {
                id: true,
                schedule: true,
                status: true,
                // primaryPhysician: true,
                patientName: true,
                reason: true,
                // cancelationReason: true
            },
            orderBy: {
                schedule: "asc"
            }
        })
        res.status(200).json(appointments)
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPatientAppointmentById = async (req, res) => {
    try {
        if (req.userRole !== "patient") {
            return res.status(403).json({ message: "Acess forbidden" })
        }

        const patientId = req.userId;

        const user = await prisma.patient.findUnique({
            where: {
                id: patientId
            }
        })
        if (!user) {
            return res.status(404).json({ message: "Please login" })
        }

        const appointments = await prisma.appointment.findMany({
            where: {
                patientId: user.id
            },
            select: {
                id:true,
                schedule: true,
                reason: true,
                patientName: true,
                status: true,
                doctor:{
                    select:{
                        firstName:true,
                        lastName:true
                    }
                }
            },
            orderBy:{
                schedule:'asc'
            }
        })

        // Send a success response with the appointment data
        res.status(200).json(appointments);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller function for updating an appointment by ID
const updateAppointmentById = async (req, res) => {

    try {
        const appointmentId = req.params.appointmentId;
        const { schedule, status, reason, cancelationReason,primaryPhysician } = req.body;

        // Parse schedule to a valid Date object if it's a string
        const parsedSchedule = schedule ? new Date(schedule) : undefined;
        // Validate date format
        if (parsedSchedule && isNaN(parsedSchedule.getTime())) {
            return res.status(400).json({ message: 'Invalid schedule date format' });
        }

        // Check if the appointment with the given ID exists
        const existingAppointment = await prisma.appointment.findUnique({
            where: {
                id: appointmentId
            },
            include: {
                patient: true,
                doctor: true
            }
        })
        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (
            (req.userRole === 'patient' && existingAppointment.patient?.userId !== req.userId) ||
            (req.userRole === 'doctor' && existingAppointment.doctor?.userId !== req.userId)
        ) {
            return res.status(403).json({ message: 'Access forbidden: You cannot update this appointment' });
        }

        // Extract updated appointment data from req.body
        const updatedAppointment = await prisma.appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                schedule: parsedSchedule || existingAppointment.schedule,
                status: status || existingAppointment.status,
                reason: reason || existingAppointment.reason,
                primaryPhysician: primaryPhysician || existingAppointment.primaryPhysician,
                cancelationReason: cancelationReason || existingAppointment.cancelationReason
            }
        })


        // Send a success response with the updated appointment data
        res.status(200).json(updatedAppointment);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an appointment by ID
const deleteAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        // Check if the appointment with the given ID exists
        const existingAppointment = await prisma.appointment.findUnique({
            where: {
                id: appointmentId
            },
            include: {
                patient: true,
                doctor: true
            }
        })
        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (
            (req.userRole === 'patient' && existingAppointment.patient?.userId !== req.userId) ||
            (req.userRole === 'doctor' && existingAppointment.doctor?.userId !== req.userId)
        ) {
            return res.status(403).json({ message: 'Access forbidden: You cannot delete this appointment' });
        }

        await prisma.appointment.delete({
            where:{
                id: appointmentId
            }
        })


        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createAppointment,
    getDoctorAppointmentById,
    updateAppointmentById,
    deleteAppointmentById,
    getPatientAppointmentById
};

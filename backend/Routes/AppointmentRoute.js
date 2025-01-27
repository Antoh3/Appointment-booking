const express = require("express");
const AppointmentRouter = express.Router();
const {
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
  getPatientAppointmentById,
  getDoctorAppointmentById,
} = require("../Controllers/AppointmentController");
const Auth = require("../Middlewares/JWT.authentication");

// Create a new appointment
AppointmentRouter.post("/bookAppointment",Auth.authenticateToken, createAppointment);

// Get a single appointment by ID
AppointmentRouter.get("/doctor",Auth.authenticateToken, getDoctorAppointmentById);

AppointmentRouter.get("/patient",Auth.authenticateToken, getPatientAppointmentById);

// Update an appointment by ID
AppointmentRouter.put("/:appointmentId",  updateAppointmentById);   

// Delete an appointment by ID
AppointmentRouter.delete("/:appointmentId",  deleteAppointmentById);


module.exports = AppointmentRouter;

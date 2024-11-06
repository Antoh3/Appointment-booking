const express = require("express");
const {
  register,
  login,
  deleteDoctor,
  updateDoctor,
  getAllDoctors,
  updateAppointment,
  findDoctor,
  doctorDetails
} = require("../Controllers/Doctor.controller");
const DoctorRouter = express.Router();
const { authenticateToken  }= require("../Middlewares/JWT.authentication");
const { DoctorAuth } = require("../Middlewares/RoleBased.authentication");

// Doctor Registration
DoctorRouter.post("/user", register);
DoctorRouter.post("/register", authenticateToken,DoctorAuth, doctorDetails)
// Doctor Login
DoctorRouter.post("/login", login);
// Doctor Deletion
DoctorRouter.delete("/deleteDoctor",authenticateToken,DoctorAuth, deleteDoctor);
// Doctor Update
DoctorRouter.put("/updateDoctor/:doctorId",authenticateToken, updateDoctor);
// DoctorRouter.patch("/:doctorId",Auth,DoctorAuth, updateDoctor);
// All Doctors Data
DoctorRouter.get("/all",authenticateToken,getAllDoctors);
//find Doctor by id
DoctorRouter.get("/:doctorId",authenticateToken, findDoctor);
//only do changes in appoinment
// DoctorRouter.patch("/appoinment/:doctorId", Auth, DoctorAuth, updateAppointment);

module.exports = DoctorRouter;

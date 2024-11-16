const express = require("express");
const {
  registerUser,
  registerPatient,
  loginPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
  updateAppointment,
  searchDoctors
} = require("../Controllers/Patient.controller");
const { authenticateToken  }= require("../Middlewares/JWT.authentication");
const { PatientAuth } = require("../Middlewares/RoleBased.authentication");

const PatientRouter = express.Router();
const multer =  require('multer')
const path = require('path')

// Set up storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ' - ' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Define which fields to accept for file uploads
  const uploadFields = upload.fields([
    { name: 'identificationDocument', maxCount: 1 },
    // Add more fields if necessary
  ]);



// Register a new patient
PatientRouter.post("/register",authenticateToken,registerPatient);
PatientRouter.post("/user", registerUser)
// Login a patient
PatientRouter.post("/login", loginPatient);
PatientRouter.get("/search",searchDoctors)
// Get a patient by ID
PatientRouter.get("/patient",authenticateToken, getPatientById);
// Update a patient by ID
PatientRouter.put("/updatePatient",authenticateToken,uploadFields,updatePatientById);
// PatientRouter.patch("/:patientId", updatePatientById);
PatientRouter.patch("/appointment/:patientId", updateAppointment);
// Delete a patient by ID
PatientRouter.delete("/deletePatient",authenticateToken,deletePatientById);

module.exports = PatientRouter;

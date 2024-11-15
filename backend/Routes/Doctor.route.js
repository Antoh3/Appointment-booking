const express = require("express");
const {
  register,
  login,
  deleteDoctor,
  updateDoctor,
  getAllDoctors,
  updateAppointment,
  findDoctor,
  doctorDetails,
  uploadDocuments
} = require("../Controllers/Doctor.controller");
const DoctorRouter = express.Router();
const { authenticateToken  }= require("../Middlewares/JWT.authentication");
const { DoctorAuth } = require("../Middlewares/RoleBased.authentication");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename:(req,file,cb)=>{
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  })
})

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
DoctorRouter.post('/upload-documents',
  upload.fields([
    {name: 'idFront', maxCount: 1},
    {name: 'idBack',maxCount: 1},
    {name: 'certificate', maxCount: 1}
  ]),
  authenticateToken,uploadDocuments,
);

module.exports = DoctorRouter;

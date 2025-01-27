const express = require("express");
const {
  registerDoctor,
  login,
  deleteDoctor,
  updateDoctor,
  getAllDoctors,
  updateAppointment,
  findDoctor,
  doctorDetails,
  uploadDocuments,
  validateregistrationNumber,
  searchDoctors
} = require("../Controllers/DoctorController");
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
DoctorRouter.post("/register", registerDoctor);
// DoctorRouter.post("/register", authenticateToken,DoctorAuth, doctorDetails)
// Doctor Login
DoctorRouter.post("/login", login);
DoctorRouter.get("/search", searchDoctors);
// Doctor Deletion
DoctorRouter.delete("/deleteDoctor",authenticateToken,DoctorAuth, deleteDoctor);
// Doctor Update
DoctorRouter.put("/updateDoctor/:doctorId",authenticateToken, updateDoctor);
// DoctorRouter.patch("/:doctorId",Auth,DoctorAuth, updateDoctor);
// All Doctors Data
DoctorRouter.get("/all",getAllDoctors);
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

DoctorRouter.post("/validate-reg-no",authenticateToken,validateregistrationNumber)


module.exports = DoctorRouter;

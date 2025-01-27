const express = require('express');
const  AmbulanceRouter = express.Router();
const {
    ambulanceRequest,
    createAmbulance,
    trackAmbulance,
    getAllAmbulances,
    getAllAmbulanceRequests,
    getAmbulanceById,
    updateAmbulance,
} = require("../Controllers/AmbulanceController")
const {loginPatient1} = require("../Controllers/PatientController")
const { authenticateToken }= require("../Middlewares/JWT.authentication");

AmbulanceRouter.post("/login", loginPatient1);
AmbulanceRouter.post("/createambulance",createAmbulance);
AmbulanceRouter.get("/getall",getAllAmbulances);
AmbulanceRouter.get("/ambulancerequests",authenticateToken,getAllAmbulanceRequests);
AmbulanceRouter.get("/ambulance/:ambulanceId",getAmbulanceById);
AmbulanceRouter.put("/updateambulance/:ambulanceId",updateAmbulance);
AmbulanceRouter.post("/requestambulance",authenticateToken,ambulanceRequest);
AmbulanceRouter.get("/trackambulance/:requestId",authenticateToken,trackAmbulance);

module.exports = AmbulanceRouter;
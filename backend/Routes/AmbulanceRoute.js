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
    approveAmbulance,
    approveAmbulanceRequest,
} = require("../Controllers/AmbulanceController")
const {loginPatient1} = require("../Controllers/PatientController")
const { authenticateToken }= require("../Middlewares/JWT.authentication");

AmbulanceRouter.get("/getall",getAllAmbulances);
AmbulanceRouter.post("/login", loginPatient1);
AmbulanceRouter.post("/createambulance",createAmbulance);
AmbulanceRouter.get("/ambulancerequests",authenticateToken,getAllAmbulanceRequests);
AmbulanceRouter.get("/ambulancerequests",authenticateToken,getAllAmbulanceRequests);

AmbulanceRouter.get("/ambulance/:ambulanceId",getAmbulanceById);
AmbulanceRouter.patch("/ambulance/:ambulanceId",approveAmbulance);
AmbulanceRouter.put("/updateambulance/:ambulanceId",updateAmbulance);
AmbulanceRouter.patch("/approverequest/:ambulanceRequestId",approveAmbulanceRequest)


AmbulanceRouter.get("/ambulancerequests",authenticateToken,getAllAmbulanceRequests);
AmbulanceRouter.post("/requestambulance",authenticateToken,ambulanceRequest);
AmbulanceRouter.get("/trackambulance/:requestId",authenticateToken,trackAmbulance);

module.exports = AmbulanceRouter;
const express = require('express');
const  AmbulanceRouter = express.Router();
const {ambulanceRequest,createAmbulance,trackAmbulance} = require("../Controllers/AmbulanceController")
const { authenticateToken }= require("../Middlewares/JWT.authentication");


AmbulanceRouter.post("/createambulance",createAmbulance)
AmbulanceRouter.post("/requestambulance",authenticateToken,ambulanceRequest);
AmbulanceRouter.get("/trackambulance/:requestId",authenticateToken,trackAmbulance);

module.exports = AmbulanceRouter;
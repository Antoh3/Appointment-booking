const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const DoctorRouter = require('./Routes/Doctor.route');
const PatientRouter = require('./Routes/Patient.route');
const AppointmentRouter = require('./Routes/Appointment.route');
const AdminRouter = require('./Routes/Admin.route');
const TokenRouter = require('./Routes/Token');
const AmbulanceRouter = require('./Routes/AmbulanceRoute');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
});
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('combined'));
app.use(compression());

// Routes
app.get("/", (req, res) => {
    res.send("Doctors Appointment Backend");
});

app.use("/doctor", DoctorRouter);
app.use("/patient", PatientRouter);
app.use("/appointment", AppointmentRouter);
app.use("/admin", AdminRouter);
app.use("/token", TokenRouter);
app.use("/ambulance", AmbulanceRouter);




app.all("*", (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Server and Prisma connection
async function startServer() {
    try {
        await prisma.$connect();
        console.log("Connected to Prisma");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

startServer();

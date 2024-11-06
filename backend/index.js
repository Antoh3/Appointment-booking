const  express=require('express');
const { PrismaClient } = require('@prisma/client')
const DoctorRouter = require('./Routes/Doctor.route');
const PatientRouter = require('./Routes/Patient.route');
const AppointmentRouter = require('./Routes/Appointment.route');
const AdminRouter = require('./Routes/Admin.route');
const TokenRouter = require('./Routes/Token')
const cors = require('cors')

const prisma = new PrismaClient();


require("dotenv").config()
const app = express();
const port = process.env.PORT;




// app.listen(process.env.PORT||3001,async()=>{
//     try {
//         await prisma.$connect();
//         console.log("connected to prisma")
//     } catch (error) {
//         console.log("unable to connect to database")
//         await prisma.$disconnect();
//         process.exit();
//     }
//     console.log("server is running on port 8080")
// })

async function main() {
    // all middlewares
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));

    app.get("/",(req,res)=>{    
        res.send("Doctors Appoinment Backend")
    })

    // allroutes
    app.use("/doctor",DoctorRouter)
    app.use("/patient",PatientRouter)
    app.use("/appointment",AppointmentRouter)
    app.use("/admin",AdminRouter)
    app.use("/token",TokenRouter)

    app.all("*", (req, res) =>{
        res.status(404).json({error : `Route ${req.originalUrl} not found`})
    });

    app.listen(port, ()=>{
        console.log(`Server listening to port ${port}`);
    });
}

main()
    .then(async ()=>{
        await prisma.$connect();
        console.log("connected to prisma");
    })
    .catch( async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit();
    })



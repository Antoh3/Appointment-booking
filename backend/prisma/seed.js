const prisma = require('./prismaClient')

const generateRandomLocation = () => {
  const latitude = (Math.random() * 2 + 37).toFixed(6); // Near a specific location
  const longitude = (Math.random() * 2 - 122).toFixed(6); // Random within range
  return { latitude, longitude };
};

const seed = async () => {
  try {
    // Seed Users
    await prisma.user.createMany({
      data: [
        { id: "user-1", email: "admin@gmail.com", name: "Admin User", phone: "1111111111", password: "admin123", role: "admin" },
        { id: "user-2", email: "drjohn@gmail.com", name: "Dr. Alice", phone: "2222222222", password: "doctor123", role: "doctor" },
        { id: "user-3", email: "dralice@gmail.com", name: "Dr. Bob", phone: "3333333333", password: "doctor123", role: "doctor" },
        { id: "user-4", email: "emmanuelmuuo755@gmail.com", name: "Patient One", phone: "4444444444", password: "patient123", role: "patient" },
        { id: "user-5", email: "emmanuelmuuo75@gmail.com", name: "Patient Two", phone: "5555555555", password: "patient123", role: "patient" },
      ],
    });

    // Seed Doctors
    await prisma.doctor.createMany({
      data: [
        {
          id: "doctor-1",
          firstName: "Alice",
          lastName: "Smith",
          email: "dralice@gmail.com",
          phone: "2222222222",
          gender: "female",
          specialization: "Cardiology",
          licenseNumber: "DOC123",
          registrationNumber: "REG123",
          password: "doctor123",
        },
        {
          id: "doctor-2",
          firstName: "Bob",
          lastName: "Johnson",
          email: "drbob@example.com",
          phone: "3333333333",
          gender: "male",
          specialization: "Neurology",
          licenseNumber: "DOC456",
          registrationNumber: "REG456",
          password: "doctor123",
        },
      ],
    });

    // Generate random locations for ambulances and patients
    const ambulanceLocations = Array.from({ length: 10 }, generateRandomLocation);

    // Seed Ambulances
    await prisma.ambulance.createMany({
      data: ambulanceLocations.map((loc, i) => ({
        id: `ambulance-${i + 1}`,
        name: `Ambulance ${i + 1}`,
        licenseNumber: `AMB${i + 1}`,
        location: loc,
        type: i % 2 === 0 ? "Basic" : "Advanced",
        owner: `Owner ${i + 1}`,
      })),
    });

    // Seed Patients
    await prisma.patient.createMany({
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `patient-${i + 1}`,
        firstName: `PatientFirst${i + 1}`,
        lastName: `PatientLast${i + 1}`,
        email: `patient${i + 1}@example.com`,
        phoneNumber: `567890123${i}`,
        birthDate: `199${i % 10}-01-01`,
        gender: i % 2 === 0 ? "male" : "female",
        idNumber: `ID${i + 1}`,
        permanentLocation: ambulanceLocations[i % 10], // Close to an ambulance
        password: "patient123",
      })),
    });

    // Seed Appointments
    await prisma.appointment.createMany({
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `appointment-${i + 1}`,
        schedule: new Date(Date.now() + i * 3600 * 1000),
        status: "scheduled",
        patientName: `PatientFirst${i + 1} PatientLast${i + 1}`,
        reason: "Routine Checkup",
        patientId: `patient-${i + 1}`,
        doctorId: `doctor-${(i % 2) + 1}`,
      })),
    });

    // Seed Feedbacks
    await prisma.feedback.createMany({
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `feedback-${i + 1}`,
        content: `Feedback content ${i + 1}`,
        userId: `patient-${i + 1}`,
      })),
    });

    // Seed Ambulance Requests
    await prisma.ambulanceRequest.createMany({
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `request-${i + 1}`,
        aidCarType: i % 2 === 0 ? "Basic" : "Advanced",
        selectedItems: {},
        patientId: `patient-${i + 1}`,
        ambulanceId: `ambulance-${i + 1}`,
      })),
    });

    console.log("Seeding completed!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await prisma.$disconnect();
  }
};

seed();

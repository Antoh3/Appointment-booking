"use client";
import React from "react";
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { CardUpcomingAppointment } from "@/components/UI/cards/CardUpcomingAppointment";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
} from "@nextui-org/react";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { AppointmentStatus } from "@/types";
import {
  now,
  getLocalTimeZone,
  Time,
} from "@internationalized/date";
import createAxiosInstance from "@/app/context/axiosInstance";
import { useState,useEffect,useMemo } from "react";

interface Appointment {
  id?: string;
  schedule: string;
  reason: string;
  patientName: string;
  status: AppointmentStatus;
  doctor: {
    firstName: string,
    lastName: string,
  }
}


const patients = [
  {
    name: "James Doe",
    email: "james@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "Active",
  },
  {
    name: "Angie Jamale",
    email: "angie@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "Followedup",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "scheduled",
  },
];
const appointments = [
  {
    name: "James Doe",
    email: "james@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "scheduled",
  },
  {
    name: "Angie Jamale",
    email: "angie@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "approved",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "canceled",
  },
];

export default function HomePage() {
  const [appointments,setAppointments] = useState<Appointment[]>([]);
  const axiosInstance = createAxiosInstance();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  console.log("in appointments");
  
  // console.log("All appointments",appointments);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axiosInstance
      .get("/appointment/doctor")
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const pages = Math.ceil(appointments.length / rowsPerPage);
  const paginatedAppointments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return appointments.slice(start, end);
  }, [page, appointments]);

  return (
    <main className="flex flex-col gap-4 mx-0 px-0 w-full">
      <div className="grid md:grid-cols-3 gap-4 flex-wrap items-start ">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid md:grid-cols-3  gap-4 flex-wrap">
            <CardSummary title="Total Patients" value="50" />
            <CardSummary title="Total Appointments" value="20" />
            <CardSummary title="Upcoming Appointments" value="5 Today" />
          </div>
          {/* start appointments */}
          <div>
            <h1 className="bold">Booked Appointments</h1>
            <Table
              aria-label="Example static collection table"
              removeWrapper
              className="bg-white rounded-lg border p-2 "
              selectionMode="single" bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }>
              <TableHeader className="!bg-none">
                <TableColumn>Patient Name</TableColumn>
                <TableColumn>Scheduled Date & Time</TableColumn>
                <TableColumn>Reason</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody items={paginatedAppointments} emptyContent={"No appointments yet."}>
                {appointments?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{item?.patientName}</TableCell>
                    <TableCell>{item?.schedule}</TableCell>
                    <TableCell>{item?.reason}</TableCell>
                    <TableCell>
                      <span
                        className={
                          " rounded w-full block text-center"
                        }
                      >
                        <AppointmentStatusBadge status={item?.status} />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* end appointments */}
          {/* start patient */}
          <div>
            <h1 className="bold">All Patients</h1>
            <Table
              aria-label="Example static collection table"
              removeWrapper
              className="bg-white rounded-lg border p-2"
            >
              <TableHeader className="!bg-none">
                <TableColumn>Patient Name</TableColumn>
                <TableColumn>Email Address</TableColumn>
                <TableColumn>Appointment Date</TableColumn>
                <TableColumn>Department</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No patients yet."}>
                {patients?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.appointmentDate}</TableCell>
                    <TableCell>{item?.type}</TableCell>
                    <TableCell>
                      <span
                        className={
                          " px-2 py-1 rounded w-full block text-center"
                        }
                      >
                        <AppointmentStatusBadge status={item?.status} />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* end patient */}
        </div>

        <div >
          <CardUpcomingAppointment
            date={now(getLocalTimeZone())}
            startTime={new Time(11, 30)}
            endTime={new Time(12, 30)}
            location={"Online"}
            patient={{
              name: "Emmanuel Muuo",
              type: "Adult",
              image: "/images/dr-green.png",
            }}
          />
        </div>

      </div>
    </main>
  );
}

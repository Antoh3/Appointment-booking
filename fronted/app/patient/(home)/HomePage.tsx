"use client";
import React from "react";
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { CardUpcomingAppointment } from "@/components/UI/cards/CardUpcomingAppointment";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
// import { fetchAppointments,Appointment } from "../appointments";
import { useState, useEffect, useMemo } from "react";


import {
  now,
  getLocalTimeZone,
  Time,
} from "@internationalized/date";
import { AppointmentStatus } from "@/types";
import createAxiosInstance from "@/app/context/axiosInstance";
import axios from "axios";

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

interface Ambulance {
  id?: string;
  aidCarType: string;
  status: string;
  ambulance: {
    owner: string,
    name: string
  },
  patient: {
    firstName: string,
    lastName: string
  }
}


const patients = [
  {
    name: "James Doe",
    email: "james@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "assigned",
  },
  {
    name: "Angie Jamale",
    email: "angie@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "available",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "on_route",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "mantainance",
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
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "Completed",
  },
];

export default function HomePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;



  const axiosInstance = createAxiosInstance();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axiosInstance
      .get("/appointment/patient")
      .then((response) => {
        setAppointments(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    await axiosInstance
      .get("/ambulance/ambulancerequests")
      .then((response) => {
        setAmbulances(response.data);
      })
      .catch((error) => {
        console.error(error);
      })

  }

  const pages = Math.ceil(appointments.length / rowsPerPage);
  const paginatedAppointments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return appointments.slice(start, end);
  }, [page, appointments]);


  const pages1 = Math.ceil(ambulances.length / rowsPerPage);
  const paginatedAmbulanceRequests = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ambulances.slice(start, end);
  }, [page, ambulances]);


  return (
    <main className="flex flex-col gap-4">
      <div className="grid md:grid-cols-3 gap-4 flex-wrap items-start ">
        <div className="md:col-span-2 flex flex-col flex-wrap gap-4">
          <div className="grid md:grid-cols-4  gap-4 flex-wrap">
            {/* <CardSummary title="Total Patients" value="50" /> */}
            <CardSummary title="Total Appointments" value="20" />
            <CardSummary title="Finished Appointments" value="20" />
            <CardSummary title="Upcoming Appointments" value="5  Today" />
            <CardSummary title="Canceled Appointments" value="5  Today" />
          </div>
          <div>
            <h1>All Appointments</h1>
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
                <TableColumn>Dr. Name</TableColumn>
                <TableColumn>Appointment Date</TableColumn>
                <TableColumn>Reason</TableColumn>
                <TableColumn>Status</TableColumn>

              </TableHeader>
              <TableBody items={paginatedAppointments} emptyContent={"No appointments yet."}>
                {appointments?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{item?.patientName}</TableCell>
                    <TableCell>{`Dr. ${item.doctor.firstName}`}</TableCell>
                    <TableCell>{item?.schedule}</TableCell>
                    <TableCell>{item?.reason}</TableCell>
                    {/* <TableCell>{item?.type}</TableCell> */}
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
          {/* start ambulance requests */}
          <div>
            <h1>Ambulance Requests</h1>
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
                    total={pages1}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }>
              <TableHeader className="!bg-none">
                <TableColumn>Patient Name</TableColumn>
                <TableColumn>Ambulance Name</TableColumn>
                <TableColumn>Ambulance Owner</TableColumn>
                <TableColumn>Ambulance type</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody items={paginatedAmbulanceRequests} emptyContent={"No ambulancerequests yet."}>
                {ambulances?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{`${item.patient.firstName}-${item.patient.lastName}`}</TableCell>
                    <TableCell>{item?.ambulance.name}</TableCell>
                    <TableCell>{item?.ambulance.owner}</TableCell>
                    <TableCell>{item?.aidCarType}</TableCell>
                    {/* <TableCell>{item?.type}</TableCell> */}
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
          {/* end ambulance requests */}
        </div>

        <div >
          {/* {appointments?.map((item: any, i: any) => ( */}
          <div>
            <div className="mb-10">
              <CardUpcomingAppointment
                date={now(getLocalTimeZone())}
                // date={item.schedule}
                startTime={new Time(11, 30)}
                endTime={new Time(12, 30)}
                location={"Online"}
                patient={{
                  name: `Dr. Emmanuel`,
                  type: "Adult",
                  image: "/images/dr-cameron.png",
                }}
              />
            </div>
            <CardUpcomingAppointment
              date={now(getLocalTimeZone())}
              // date={item.schedule}
              startTime={new Time(11, 30)}
              endTime={new Time(12, 30)}
              location={"Online"}
              patient={{
                name: `Dr. Emmanuel`,
                type: "Adult",
                image: "/images/dr-cameron.png",
              }}
            />
          </div>

          {/* ))} */}
        </div>
      </div>
    </main>
  );
}

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
} from "@nextui-org/react";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { AppointmentStatus } from "@/types";

import {
  now,
  getLocalTimeZone,
  Time,
} from "@internationalized/date";


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
              className="bg-white rounded-lg border p-2"
            >
              <TableHeader className="!bg-none">
                <TableColumn>Patient Name</TableColumn>
                <TableColumn>Email Address</TableColumn>
                <TableColumn>Appointment Date</TableColumn>
                <TableColumn>Department</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody>
                {appointments?.map((item: any, i: number) => (
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
              <TableBody>
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

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
    status: "Followup",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "Scheduled",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col gap-4">
      <div className="grid md:grid-cols-3 gap-4 flex-wrap items-start ">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid md:grid-cols-3  gap-4 flex-wrap">
            <CardSummary title="Total Patients" value="50" />
            <CardSummary title="Total Appointments" value="20" />
            <CardSummary title="Upcoming Appointments" value="5 Today" />
          </div>

          <Table
            aria-label="Example static collection table"
            removeWrapper
            className="bg-white rounded-lg border p-2 ml-5"
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
                        "bg-green-600/20 text-green-600 px-2 py-1 rounded w-full block text-center"
                      }
                    >
                      {item?.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div >
          <CardUpcomingAppointment
            date={now(getLocalTimeZone())}
            startTime={new Time(11, 30)}
            endTime={new Time(12, 30)}
            location={"Online"}
            patient={{
              name: "Dr Cameron",
              type: "Adult",
              image: "/images/dr-cameron.png",
            }}
          />
        </div>
      </div>
    </main>
  );
}

"use client";
import React from "react";
import { CardSummary } from "@/components/UI/cards/CardSummary";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import StatusBadge from "@/components/StatusBadge";

const patients = [
  {
    name: "James Doe",
    appointmentDate: "20-06-2024",
    status: "Scheduled",
    duration: "30mins",
    time: "10:00AM",
    type: "General",
  },
  {
    name: "Angie Jamale",
    appointmentDate: "20-06-2024",
    status: "Cancelled",
    duration: "30mins",
    time: "10:00AM",
    type: "General",
  },
  {
    name: "Mary Mwoke",
    appointmentDate: "20-06-2024",
    status: "In Progress",
    duration: "30mins",
    time: "10:00AM",
    type: "General",
  },
];

export default function page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Appointments</h1>

      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <div className="grid md:grid-cols-3 gap-8 flex-wrap w-full">
          <CardSummary title="Scheduled Appointments" value="50" />
          <CardSummary title="In Progress Appointments" value="20" />
          <CardSummary title="Cancelled Appointments" value="5" />
        </div>

        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="bg-white rounded-lg border p-2"
        >
          <TableHeader className="!bg-none">
            <TableColumn>Practitioner</TableColumn>
            <TableColumn>Appointment Date</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Duration</TableColumn>
            <TableColumn>Time</TableColumn>
            <TableColumn>Type</TableColumn>
          </TableHeader>
          <TableBody>
            {patients?.map((item: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.appointmentDate}</TableCell>
                <TableCell>
                  <span className="min-w-[115px]">
                    <StatusBadge status={item?.status} />
                  </span>
                </TableCell>
                <TableCell>{item?.duration}</TableCell>
                <TableCell>{item?.time}</TableCell>
                <TableCell>{item?.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

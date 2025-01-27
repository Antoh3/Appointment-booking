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
  Button,
} from "@nextui-org/react";
import StatusBadge from "@/components/StatusBadge";
import { Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiEdit2Line,RiLoopRightFill } from "react-icons/ri";

const patients = [
  {
    name: "James Doe",
    appointmentDate: "20-06-2024",
    status: "Scheduled",
    duration: "30mins",
    time: "10:00AM",
    // type: "General",
  },
  {
    name: "Angie Jamale",
    appointmentDate: "20-06-2024",
    status: "Cancelled",
    duration: "30mins",
    time: "10:00AM",
    // type: "General",
  },
  {
    name: "Mary Mwoke",
    appointmentDate: "20-06-2024",
    status: "Pending",
    duration: "30mins",
    time: "10:00AM",
    // type: "General",
  },
];

export default function page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Appointments</h1>

      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <div className="grid md:grid-cols-4 gap-8 flex-wrap w-full">
          <CardSummary title="Total Appointments" value="50" />
          <CardSummary title="Pending Appointments" value="20" />
          <CardSummary title="Rescheduled Appointments" value="20" />
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
            <TableColumn>Action</TableColumn>
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
                <TableCell >
                  <Tooltip showArrow={true} color="success" content="Approve Appointment" placement="top-start">
                    <Button
                      isIconOnly
                      color="success"
                      variant="faded"
                      aria-label="Approve Appointment"
                      className="m-1 bg-blue-600/20"
                    // onClick={() => handleJournalEdit(item.id, item.content)}
                    >
                      <FaCheck />
                    </Button>
                  </Tooltip>
                  <Tooltip showArrow={true} color="warning" content="Reschedule Appointment" placement="top-end">
                    <Button
                      isIconOnly
                      color="warning"
                      variant="faded"
                      aria-label="Reschedule Appointment"
                      className="m-1"
                    // onClick={() => handleJournalEdit(item.id, item.content)}
                    >
                      <RiEdit2Line />
                    </Button>
                  </Tooltip>
                  <Tooltip showArrow={true} content="Cancel Appointment" color="danger" placement="top-start">
                    <Button
                      isIconOnly
                      // color="danger"
                      aria-label="Cancel Appointment"
                      className="m-1 bg-red-600/20"
                    // disabled={deleting}
                    // onClick={() => handleDeleteJournal(item.id)}
                    >
                      <IoWarningOutline />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

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
  Pagination
} from "@nextui-org/react";
import StatusBadge from "@/components/StatusBadge";
import { Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiEdit2Line, RiLoopRightFill } from "react-icons/ri";
import { useEffect, useState, useMemo } from "react";
import { AppointmentStatus } from "@/types";
import createAxiosInstance from "@/app/context/axiosInstance";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";

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

export default function page() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
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
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Appointments</h1>

      <div className="flex flex-col gap-4 flex-wrap items-start ">
        <div className="grid md:grid-cols-3 gap-8 flex-wrap w-full">
          <CardSummary title="Total Appointments" value="50" />
          <CardSummary title="Pending Appointments" value="20" />
          <CardSummary title="Rescheduled Appointments" value="20" />
          {/* <CardSummary title="Cancelled Appointments" value="5" /> */}
        </div>

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
            <TableColumn>PatientName</TableColumn>
            <TableColumn>Scheduled Date & time</TableColumn>
            <TableColumn>Reason</TableColumn>
            <TableColumn>status</TableColumn>
            {/* <TableColumn>Time</TableColumn> */}
            <TableColumn>Action</TableColumn>
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
                      "rounded w-full block text-center"
                    }
                  >
                    <AppointmentStatusBadge status={item?.status} />
                  </span>
                </TableCell>
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
                      className="m-1 bg-red-500"
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

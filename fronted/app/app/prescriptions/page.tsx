"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import StatusBadge from "@/components/StatusBadge";

const prescriptions = [
  {
    status: "Not Issued",
    pharmacy: "Lex pharmacy",
    issuedBy: "Dr. Dominic",
    issuedAt: "",
    receivedAt: "",
  },
  {
    status: "Issued",
    pharmacy: "Aga khan pharmacy",
    issuedBy: "Dr. Elvis",
    issuedAt: "3:00 PM",
    receivedAt: "3:00 PM",
  },
  {
    status: "Not Issued",
    pharmacy: "Sage pharmacy",
    issuedBy: "Dr. Neville",
    issuedAt: "",
    receivedAt: "",
  },
];

export default function page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Prescription Records</h1>

      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="bg-white rounded-lg border p-2"
        >
          <TableHeader className="!bg-none">
            <TableColumn>Status</TableColumn>
            <TableColumn>Pharmacy</TableColumn>
            <TableColumn>Issued by</TableColumn>
            <TableColumn>Issued at</TableColumn>
            <TableColumn>Received at</TableColumn>
          </TableHeader>
          <TableBody>
            {prescriptions?.map((item: any, i: number) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="min-w-[115px]">
                    <StatusBadge status={item?.status} />
                  </span>
                </TableCell>
                <TableCell>{item?.pharmacy}</TableCell>
                <TableCell>{item?.issuedBy}</TableCell>
                <TableCell>{item?.issuedAt}</TableCell>
                <TableCell>{item?.receivedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

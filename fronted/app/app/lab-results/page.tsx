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

const labs = [
  {
    lab: "South B lab",
    issuedBy: "Dr. Dominic",
    issuedAt: "South B Hospital",
    status: "Pending",
  },
  {
    lab: "Nairobi lab",
    issuedBy: "Dr. Neville",
    issuedAt: "Nairobi Hospital",
    status: "Pending",
  },
  {
    lab: "Agakhan lab",
    issuedBy: "Dr. Elvis",
    issuedAt: "Agakhan Hospital",
    status: "Complete",
  },
];

export default function page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Lab Test Results</h1>

      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="bg-white rounded-lg border p-2"
        >
          <TableHeader className="!bg-none">
            <TableColumn>Lab</TableColumn>
            <TableColumn>Issued by</TableColumn>
            <TableColumn>Issued at</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {labs?.map((item: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{item?.lab}</TableCell>
                <TableCell>{item?.issuedBy}</TableCell>
                <TableCell>{item?.issuedAt}</TableCell>
                <TableCell>
                  <span className="min-w-[115px]">
                    <StatusBadge status={item?.status} />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

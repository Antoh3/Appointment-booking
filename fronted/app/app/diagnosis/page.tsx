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

const diagnosis = [
  {
    content: "",
    date: "2024-09-11",
    issuedBy: "Dr. Dominic",
    recommendations: "",
  },
  {
    content: "",
    date: "2024-08-01",
    issuedBy: "Dr. Neville",
    recommendations: "",
  },
  {
    content: "",
    date: "2024-09-01",
    issuedBy: "Dr. Elvis",
    recommendations: "",
  },
];

export default function page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Diagnosis Records</h1>

      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="bg-white rounded-lg border p-2"
        >
          <TableHeader className="!bg-none">
            <TableColumn>Content</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Issued by</TableColumn>
            <TableColumn>Recommendations</TableColumn>
          </TableHeader>
          <TableBody>
            {diagnosis?.map((item: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{item?.content}</TableCell>
                <TableCell>{item?.date}</TableCell>
                <TableCell>{item?.issuedBy}</TableCell>
                <TableCell>{item?.recommendations}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

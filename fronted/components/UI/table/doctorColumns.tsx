"use client";

import { DataTable } from "@/components/UI/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "@/components/StatusBadge";
import { Status } from "@/types";

interface LabRecords {
  created_at: string;
  id: string;
  issued_at: string;
  issued_by: string;
  lab_id: string;
  patient_id: string;
  received_at: string;
  status: Status;
}

const DoctorColumns = () => {
  const [data, setData] = useState<LabRecords[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/patient/view_LabRecords_records")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns: ColumnDef<LabRecords>[] = [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.created_at}</p>;
      },
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.id}</p>;
      },
    },
    {
      accessorKey: "issued_at",
      header: "Issued At",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.issued_at}</p>;
      },
    },
    {
      accessorKey: "issued_by",
      header: "Issued By",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.issued_by}</p>;
      },
    },
    {
      accessorKey: "lab_id",
      header: "Lab ID",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.lab_id}</p>;
      },
    },
    {
      accessorKey: "patient_id",
      header: "Patient ID",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.patient_id}</p>;
      },
    },
    {
      accessorKey: "received_at",
      header: "Received At",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.received_at}</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>;
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
};

export default DoctorColumns;

import clsx from "clsx";
import { AppointmentStatus } from "@/types";
import { appointmentIcon } from "@/constants";

import React from 'react'

function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
    const Icons = appointmentIcon[status];

    const getColor = (status: any) => {
        switch (status) {
            case 'scheduled':
                return "text-blue-500";
            case 'approved':
                return "text-green-500";
            case 'active':
                return "text-green-500";
            case 'pending':
                return "text-blue-500";
            case 'followedup':
                return "text-blue-500";
            // case 'rescheduled':
            //     return "text-blue-500";
            case 'available':
                return "text-green-500";
            case 'accepted':
                return "text-blue-500";
            case 'assigned':
                return "text-blue-500"; 
            case 'Completed':
                return "text-blue-500"; 
            case 'on_route':
                return "text-yellow-500";
            case 'mantainance':
                return "text-red-500";
            case 'canceled':
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    }

    return (
        <div
            className={clsx("status-badge", {
                "bg-green-600/20": status === "scheduled",
                "bg-green-500/20": status === "available",
                "bg-blue-600/20": status === "approved",
                "bg-blue-700/20": status === "completed",
                "bg-blue-400/20": status === "assigned",
                "bg-blue-200/20": status === "accepted",
                "bg-blue-300/20": status === "rescheduled",
                "bg-blue-800/20": status === "pending",
                "bg-yellow-600/20": status === "followedup",
                "bg-yellow-500/20": status === "on_route",
                "bg-blue-500/20": status === "active",
                "bg-red-600/20": status === "canceled",
                "bg-red-500/20": status === "mantainance",
            })}
        >
            <Icons className={clsx("h-fit w-4 mr-2", getColor(status))} />
            <p className={clsx("text-12-semibold capitalize", getColor(status))}>
                {status}
            </p>
        </div>
    )
}

export default AppointmentStatusBadge
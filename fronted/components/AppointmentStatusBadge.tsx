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
                "bg-blue-600/20": status === "approved",
                "bg-red-600/20": status === "canceled",
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
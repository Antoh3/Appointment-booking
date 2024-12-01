import { FaCheck } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegHourglass } from "react-icons/fa6";

export const genderOptions = [
  { key: "Male", label: "Male" },
  { key: "Female", label: "Female" },
];

export const statusIcon = {
  Scheduled: FaCheck,
  "In Progress": FaRegHourglass,
  Cancelled: IoWarningOutline,
  Pending: FaRegHourglass,
  Complete: FaCheck,
  Issued: FaCheck,
  "Not Issued": FaRegHourglass,
};

export const appointmentIcon ={
  scheduled : FaRegHourglass,
  approved: FaCheck,
  canceled: IoWarningOutline
}

import { PatientConfig } from "@/types";

export const patientConfig: PatientConfig = {
  sidebarNav: [
    {
      title: "",
      items: [
        {
          title: "Home",
          href: "/patient",
          icon: "home",
        },
        {
          title: "All services",
          href: "/patient/services",
          icon: "calendar",
        },
        {
          title: "Prescription records",
          href: "/patient/prescriptions",
          icon: "prescription",
        },
        {
          title: "Appointments",
          href: "/patient/appointments",
          icon: "calendar",
        },
        {
          title: "All Doctors",
          href: "/patient/doctors",
          icon: "users",
        },
        {
          title: "FeedBack",
          href: "/patient/feedback",
          icon: "calendar",
        },
        // {
        //   title: "Allergies",
        //   href: "/patient/allergies",
        //   icon: "allergies",
        // },
        {
          title: "Additional Info",
          href: "/patient/additionalInfo",
          icon: "calendar",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          href: "/patient/settings",
          icon: "settings",
        },
        {
          title: "Help & Support",
          href: "/patient/help",
          icon: "help",
        },
        {
          title: "Logout",
          href: "/",
          icon: "logout",
        },
      ],
    },
  ],
};

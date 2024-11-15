import Image from "next/image";
import {
  FiCalendar,
  FiHelpCircle,
  FiHome,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { LiaAllergiesSolid } from "react-icons/lia";
import { FaPrescription } from "react-icons/fa";
import Link from "next/link";

const menuItems = [
  {
    title: "",
    children: [
      {
        title: "Home",
        icon: <FiHome />,
        link: "/app",
      },
      {
        title: "Diagnosis",
        icon: <FiCalendar />,
        link: "/app/diagnosis",
      },
      {
        title: "Prescription records",
        icon: <FaPrescription />,
        link: "/app/prescriptions",
      },
      {
        title: "Appointments",
        icon: <FiCalendar />,
        link: "/app/appointments",
      },
      {
        title: "Lab Test Results",
        icon: <FiUsers />,
        link: "/app/lab-results",
      },
      {
        title: "Journal",
        icon: <FiCalendar />,
        link: "/app/journal",
      },
      {
        title: "Triage",
        icon: <FiCalendar />,
        link: "/app/triage",
      },
      {
        title: "Allergies",
        icon: <LiaAllergiesSolid />,
        link: "/app/allergies",
      },
    ],
  },
  {
    title: "Settings",
    children: [
      {
        title: "Settings",
        icon: <FiSettings />,
        link: "",
      },
      {
        title: "Help & Support",
        icon: <FiHelpCircle />,
        link: "",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <main className="w-[200px] 2xl:w-[250px] bg-white h-full border-e">
      <div className="flex gap-2 items-center px-4 py-4">
        <Image
          alt="logo"
          className="w-8 2xl:w-10"
          height={100}
          priority={false}
          src="/dokta-logo.svg"
          width={100}
        />
        <h2 className="text-xl 2xl:text-3xl font-medium text-primary">
          Care <span className="text-xs">Pulse</span>
        </h2>
      </div>

      <div className="px-2 mt-10 flex flex-col justify-between gap-10">
        {menuItems.map((item: any, i) => (
          <div key={i} className="flex flex-col text-gray-600 gap-2">
            {item?.title && (
              <p className="px-4 pb-2 font-medium">{item?.title}</p>
            )}
            <div>
              {item?.children?.map((item: any, i: number) => (
                <Link
                  key={i}
                  className="flex gap-4 items-center rounded px-4 py-2 w-full cursor-pointer border border-transparent hover:bg-primary/20 hover:border-primary"
                  href={item?.link}
                >
                  <span className="text-lg">{item?.icon}</span>
                  <span className="text-sm">{item?.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

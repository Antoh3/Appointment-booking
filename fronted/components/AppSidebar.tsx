import Image from "next/image";
import {
  FiCalendar,
  FiHelpCircle,
  FiHome,
  FiSettings,
  FiUsers,
  FiLogOut
} from "react-icons/fi";
import { LiaAllergiesSolid } from "react-icons/lia";
import { FaPrescription,FaUser } from "react-icons/fa";
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
        title: "Patient Diagnostics",
        icon: <FiCalendar />,
        link: "/app/diagnosis",
      },
      {
        title: "Patient Prescriptions",
        icon: <FaPrescription />,
        link: "/app/prescriptions",
      },
      {
        title: "Appointments",
        icon: <FiCalendar />,
        link: "/app/appointments",
      },
      {
        title: "Patients",
        icon: <FiUsers />,
        link: "/app/lab-results",
      },
      {
        title: "Patient Notes",
        icon: <FiCalendar />,
        link: "/app/journal",
      },
    ],
  },
  {
    title: "Site Help",
    children: [
      {
        title: "Profile",
        icon: <FaUser />,
        link: "/app/help",
      },
      {
        title: "Help & Support",
        icon: <FiHelpCircle />,
        link: "/app/help",
      },
      {
        title: "Logout",
        icon: <FiLogOut />,
        link: "/auth/doctor/login",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <main className="w-[200px] 2xl:w-[250px]  h-full  fixed border-e">
      <div className="flex flex-row items-center border-b h-16 cursor-pointer">
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

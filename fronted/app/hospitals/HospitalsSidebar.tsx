"use client"
import Image from "next/image";
import { FiHelpCircle, FiHome, FiSettings, FiUsers } from "react-icons/fi";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { TbDirectionSign, TbHeartHandshake } from "react-icons/tb";
import { LiaClipboardListSolid } from "react-icons/lia";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Link from "next/link";

const menuItems = [
    {
        title: "",
        children: [
            {
                title: "Home",
                icon: <FiHome />,
                link: "/hospitals"
            },
            {
                title: "Practitioners",
                icon: <FiUsers />,
                link: "/hospitals/practitioners"
            },
            {
                title: "Patients",
                icon: <TbHeartHandshake />,
                link: "/hospitals/patients"
            },
            {
                title: "Requests",
                icon: <LiaClipboardListSolid />,
                subMenu: true,
                subMenuItems: [
                    {
                        title: "All Requests",
                        link: "/hospitals/requests/lab"
                    },
                    {
                        title: "pending requests",
                        link: "/hospitals/requests/patients"
                    },
                    {
                        title: "Completed  Requests",
                        link: ""
                    }
                    
                ]
            },
            // {
            //     title: "Refferals",
            //     icon: <TbDirectionSign />,
            //     link: "/hospitals/refferals"
            // },
            {
                title: "Services",
                icon: <MdOutlineInventory />,
                link: "/hospitals/services"
            },
            // {
            //     title: "Beds",
            //     icon: <LuBedSingle />,
            //     link: "/hospitals/beds"
            // }
        ]
    },
    {
        title: "Settings",
        children: [
            {
                title: "Settings",
                icon: <FiSettings />,
                link: ""
            },
            {
                title: "Help & Support",
                icon: <FiHelpCircle />,
                link: ""
            }
        ]
    }
]

export function HospitalSidebar() {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <main className="w-[200px] 2xl:w-[250px] bg-white h-screen border-e fixed">

            <div className="flex gap-2 items-center px-4 py-4">
                <Image alt="logo" src="/dokta-logo.svg" priority={false} width={100} height={100} className="w-8 2xl:w-10" />
                <h2 className="text-xl 2xl:text-3xl font-medium text-primary">
                    CARE <span className="text-xs">Pulse</span></h2>
            </div>

            <div className="px-2 mt-10 flex flex-col justify-between gap-10">
                {
                    menuItems.map((item: any, i) => (
                        <div key={i} className="flex flex-col text-gray-600 gap-2">
                            {item?.title && <p className="px-4 pb-2 font-medium">{item?.title}</p>}
                            <div>
                                {
                                    item?.children?.map((childItem: any, j: number) => {
                                        if (childItem?.subMenu) {
                                            return (
                                                <Accordion key={j} className="text-lg">
                                                    <AccordionItem key={j} aria-label={`Accordion ${j}`} startContent={childItem?.icon} title={<span className="text-sm">{childItem?.title}</span>}className="px-2">
                                                        {childItem?.subMenuItems.map((subItem: any, k: number) => (
                                                            <Link key={k} href={subItem?.link} className="text-sm flex py-2 rounded cursor-pointer border border-transparent hover:bg-primary/20 hover:border-primary px-4">{subItem?.title}</Link>
                                                        ))}
                                                    </AccordionItem>
                                                </Accordion>
                                            )
                                        } else {
                                            return (
                                                <Link key={j} href={childItem?.link}
                                                    className="flex gap-4 items-center rounded px-4 py-2 w-full cursor-pointer border border-transparent hover:bg-primary/20 hover:border-primary">
                                                    <span className="text-lg">{childItem?.icon}</span>
                                                    <span className="text-sm">{childItem?.title}</span>
                                                </Link>
                                            )
                                        }

                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

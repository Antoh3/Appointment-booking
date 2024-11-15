import { HospitalSidebar } from "./HospitalsSidebar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="h-screen w-full  flex">
        <HospitalSidebar/>
        <div className="bg-primary/5 flex-grow ps-[200px]  2xl:ps-[250px] h-max sm:min-h-screen">
        <Toaster position="top-center" />
        {children}
        </div>
      </main>
    )
  }
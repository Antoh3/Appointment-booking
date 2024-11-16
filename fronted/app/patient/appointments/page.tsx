import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
import AppointmentsColumns from "@/components/UI/table/appointmentColumns";
import SearchBar from "@/components/AppSearchbar";
import AppointmentForm from '@/components/patient/AppointmentForm'

export const metadata = {
  title: "Appointments",
};

const AppointmentsPage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Appointments" />
      <AppointmentForm />
      <SearchBar placeholder="search appointments....."/>
      <AppointmentsColumns />
    </SiteShell>
  );
};

export default AppointmentsPage;

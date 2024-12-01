import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
import PrescriptionColumns from "@/components/UI/table/prescriptionColumns";

export const metadata = {
  title: "Ambulance requests",
};

const PrescriptionsPage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Emergency and Ambulance requests" />
      <PrescriptionColumns />
    </SiteShell>
  );
};

export default PrescriptionsPage;

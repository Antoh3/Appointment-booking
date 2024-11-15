import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
import PrescriptionColumns from "@/components/UI/table/prescriptionColumns";

export const metadata = {
  title: "Prescriptions",
};

const PrescriptionsPage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Prescription Records" />
      <PrescriptionColumns />
    </SiteShell>
  );
};

export default PrescriptionsPage;

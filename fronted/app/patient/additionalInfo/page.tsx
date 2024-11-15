import SiteHeader from "@/components/patient/SiteHeader";
import SiteShell from "@/components/patient/SiteShell";
import TriageDashboard from "@/components/patient/TriageDashboard";

export const metadata = {
  title: "Triage",
};

const TriagePage = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Triage" />
      <TriageDashboard />
    </SiteShell>
  );
};

export default TriagePage;

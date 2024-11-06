import Link from "@/node_modules/next/link";
// import Image from "@/node_modules/next/image";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import PatientForm from "@/components/forms/PatientForm";
import AuthProvider from "./context/AuthContext";
// import PasskeyModal from "@/components/ui/PasskeyModal";

const Home = () => {
  // const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {/* {isAdmin && <PasskeyModal />} */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%] h-full"
      />
    </div>
  );
};

export default Home;
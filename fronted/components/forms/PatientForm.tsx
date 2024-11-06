"use client";

import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { Roles } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios"
import { toast } from "react-toastify";
import { SelectItem } from "../ui/select";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  FILE_UPLOAD = "FILE_UPLOAD",
  PASSWORD_INPUT = "PASSWORD_INPUT",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit({ name, email, phone, password,role }: { name: string; email: string; phone: string; password: string;role:any }) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone, password,role };

      // Handle user creation logic here (removed createUser for client-side use)
      const response = await axios.post("http://localhost:5000/patient/user", userData)

      setMessage(response.data.message);


      if (response.status == 200) {

        toast.success("Registration successful", {
          style: { minWidth: '200px', maxWidth: '300px', fontSize: '14px', borderRadius: '12px' },
        });

        router.push('/patients/userId/login')
      }


      console.log("User data submitted:", userData);

      // Simulate successful submission
      // router.push(`/patients/success`);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message, {
          style: { minWidth: '200px', maxWidth: '300px', fontSize: '14px', borderRadius: '12px' },
        }); // Display error message from API
      } else {
        console.error(error);
        toast.error('An unexpected error occurred.', {
          style: { minWidth: '200px', maxWidth: '300px', fontSize: '14px', borderRadius: '12px' },
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Register to get started with appointments.</p>
        </section>
        <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              Register as a
            </p>
            {/* <Link href="#" className="text-green-500">
              Admin
            </Link> */}
            <Link href="#" className="text-green-500">
              Doctor
            </Link><Link href="#" className="text-green-500">
              Patient
            </Link>
          </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
        />

        <CustomFormField
          fieldType={FormFieldType.PASSWORD_INPUT}
          control={form.control}
          name="password"
          label="Password"
          placeholder="*******"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="role"
          label="Role"
          placeholder="Select a role"
        >
          {Roles.map((option, i) => (
            <SelectItem key={option + i} value={option}>
              {option}
            </SelectItem>
          ))}
        </CustomFormField>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;

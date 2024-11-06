"use client";

import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import axios from "axios"
import { toast } from "react-toastify";
import createAxiosInstance from "@/app/context/axiosInstance";
import { useAuth } from "@/app/context/AuthContext";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
    FILE_UPLOAD = "FILE_UPLOAD",
    PASSWORD_INPUT = "PASSWORD_INPUT"
}

function LoginForm({ user }: { user: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { setTokens } = useAuth();
    const axiosInstance = createAxiosInstance();


    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit({ email, password }: { email: string; password: string }) {
        setIsLoading(true);

        try {
            const userData = { email, password };

            // Handle user creation logic here (removed createUser for client-side use)
            const response = await axiosInstance.post("/patient/login", userData);
            const { accessToken, refreshToken } = response.data;
            setTokens(accessToken, refreshToken);
            setMessage(response.data.message);

            if (response.status == 200) {
                toast.success("Login successful", {
                    style: { minWidth: '200px', maxWidth: '300px', fontSize: '14px', borderRadius: '12px' },
                });

                router.push('/patients/userId/register')
            }
            // console.log("User data submitted:", userData);
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
                    <p className="text-dark-700">Login to your account to get started.</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="example@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                <CustomFormField
                    fieldType={FormFieldType.PASSWORD_INPUT}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="*******"
                />

                <SubmitButton isLoading={isLoading}>Login</SubmitButton>
            </form>
        </Form>
    )
}

export default LoginForm

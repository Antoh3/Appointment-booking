"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl } from "../ui/form"
import CustomFormField from "../CustomFormField"
import { useState } from "react"
import SubmitButton from "../SubmitButton"
import { useRouter } from "@/node_modules/next/navigation"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import {
    Doctors,
    GenderOptions,
    IdentificationTypes,
    PatientFormDefaultValues
} from "@/constants/index"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "@/node_modules/next/image"
import FileUploader from "../FileUploader"
import axios from "axios"
import createAxiosInstance from "@/app/context/axiosInstance";
import { toast } from 'react-toastify'

const RegisterForm = ({ user }: { user: any }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const axiosInstance = createAxiosInstance();

    const form = useForm({
        defaultValues: {
            ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit(values: any) {
        setIsLoading(true)

        // Store file info in form data as
        let formData
        if (values.identificationDocument && values.identificationDocument?.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            })

            formData = new FormData()
            formData.append("blobFile", blobFile)
            formData.append("fileName", values.identificationDocument[0].name)
        }

        try {
            const patientData = {
                // userId: user.$id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                birthDate: new Date(values.birthDate),
                gender: values.gender,
                address: values.address,
                occupation: values.occupation,
                emergencyContactName: values.emergencyContactName,
                emergencyContactNumber: values.emergencyContactNumber,
                primaryPhysician: values.primaryPhysician,
                insuranceProvider: values.insuranceProvider,
                insurancePolicyNumber: values.insurancePolicyNumber,
                allergies: values.allergies,
                currentMedication: values.currentMedication,
                familyMedicalHistory: values.familyMedicalHistory,
                pastMedicalHistory: values.pastMedicalHistory,
                identificationType: values.identificationType,
                identificationNumber: values.identificationNumber,
                identificationDocument: values.identificationDocument
                    ? formData
                    : undefined,
                privacyConsent: values.privacyConsent,
            }

            // Handle patient registration logic here
            const response = await axiosInstance.post("/patient/register", patientData)
            // console.log(response);
            setMessage(response.data.message);

            if (response.status == 200) {
                toast.success("Registration successful", {
                    style: { minWidth: '200px', maxWidth: '300px', fontSize: '14px', borderRadius: '12px' },
                });
                // router.push(`/patients/${user.$id}/new-appointment`)
                router.push(`/patients/userId/new-appointments`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself.</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
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
                        placeholder="(+254) 732 xxxxxx"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="14 Street, New York "
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Occupation"
                        placeholder="Software Engineer"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency contact name"
                        placeholder="Guardian's name"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Emergency contact number"
                        placeholder="(555) 123-4567"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primay Physician"
                    placeholder="Select a physician"
                >
                    {Doctors.map((doctor, i) => (
                        <SelectItem key={doctor.name + i} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    width={32}
                                    height={32}
                                    alt="doctor"
                                    className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="Sagicor"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="ABC123456789"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Peanuts, Penicillin, Pollen"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current medication (if any)"
                        placeholder="Ibuprofen 200mg, Paracetamol 50mg"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Family medical history"
                        placeholder="Mother had breast cancer, Father had heart disease"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past medical history"
                        placeholder="Appendectomy, Tonsillectomy"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification & Verification</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="Identification type"
                    placeholder="Select an identification type"
                >
                    {IdentificationTypes.map((option, i) => (
                        <SelectItem key={option + i} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="identificationNumber"
                        label="Identification number"
                        placeholder="123456789"
                    />

                    {/* <CustomFormField
                        fieldType={FormFieldType.FILE_UPLOAD}
                        control={form.control}
                        name="identificationDocument"
                        label="Upload identification document"
                        placeholder="No file selected"
                        renderSkeleton={() => 
                        <FileUploader files={undefined} onChange={function (files: File[]): void {
                            throw new Error("Function not implemented.")
                        }} />}
                    /> */}
                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="identificationDocument"
                        label="Scanned copy of identification document"
                        placeholder="No file selected"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader files={field.value}
                                    onChange={field.onChange} />
                            </FormControl>
                        )}
                    />
                </div>

                {/* <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="treatmentConsent"
                    label="I consent to receive treatment for my health condition."
                />

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="disclosureConsent"
                    label="I consent to the use and disclosure of my health
                            information for treatment purposes."
                /> */}

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                    label="I consent to the use of my data for healthcare purposes."
                />

                <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm

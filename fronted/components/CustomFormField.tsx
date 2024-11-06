'use client'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm";
import Image from "@/node_modules/next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import E164Number from "react-phone-number-input"
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
// import PhoneInput,{E164Number} from 'react-phone-number-input'

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
}


const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                    />
                </FormControl>
            )
        case FormFieldType.PHONE_INPUT:
            // <div className="flex rounded-md border border-dark-500 bg-dark-400">
            return (
                <div >
                    <FormControl>
                        <PhoneInput
                            defaultCountry="US"
                            placeholder={props.placeholder}
                            international
                            withCountryCallingCode
                            value={field.value as E164Number | undefined} // Ensure correct type casting
                            onChange={field.onChange}
                            className="input-phone"
                        />
                    </FormControl >
                </div>
            )
        // </div>
        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="user"
                        className="ml-2"
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value ? new Date(field.value) : null}  // Ensure value is Date
                            // onChange={(date: Date) => field.onChange(date)}
                            dateFormat={dateFormat ??
                                'MM/dd/yyyy'}
                            showTimeSelect={showTimeSelect}
                            wrapperClassName="date-picker"
                            timeInputLabel="Time:"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue placeholder={props.placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.SKELETON:
            return (
                renderSkeleton ? renderSkeleton(field)
                    : null
            )
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );
        case FormFieldType.PASSWORD_INPUT:
            const [isVisible, setIsVisible] = useState(false); // State for toggling visibility

            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <FormControl>
                        <Input
                            type={isVisible ? "text" : "password"} // Toggle between text and password
                            placeholder={props.placeholder}
                            value={field.value}
                            onChange={field.onChange}
                            className="input-password"
                        />
                    </FormControl>
                    <button type="button" onClick={() => setIsVisible(!isVisible)} className="p-2">
                        {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />} {/* Icon changes based on visibility */}
                    </button>
                </div>
            );
        default:
            break;
    }
}


const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />

                    <FormMessage className="shad-error" />

                </FormItem>
            )}
        />
    )
}

export default CustomFormField;
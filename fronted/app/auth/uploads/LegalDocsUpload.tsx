"use client"
import React, {useState} from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem} from "@nextui-org/react";
import {useForm} from "react-hook-form"
import FileUploads from "@/components/UI/Uploads/FileUploads";
import {IoIosArrowDown} from 'react-icons/io'

const practitioners = [
    {key: "ID", label: "National ID"},
    {key: "PASSPORT", label: "Passport"},
];

export default function LegalDocsUpload() {
    const [practitioner, setPractitioner] = useState('ID');
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["item1"]))

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    )

    const {register, handleSubmit} = useForm()
    return (
        <main className="w-full border border-primary p-4 rounded-lg">
            {/*<h1 className="text-2xl textDark font-semibold text-center">Documents upload</h1>*/}
            {/*<p className="text-center">Upload the documents outlined below</p>*/}
            {/*<label htmlFor="dropdown" className="text-sm">Document type</label>*/}

            <Select
                variant="faded"
                className="w-full"
                color="primary"
                label="Document Type"
                selectedKeys={[practitioner]}
                onChange={(e) => setPractitioner(e.target.value)}
            >
                {practitioners.map((item) => (
                    <SelectItem key={item.key} className="text-2xl font-bold">
                        {item.label}
                    </SelectItem>
                ))}
            </Select>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <FileUploads {...register("idFront", {required: true})} data={"Click to Upload ID Front"}/>
                <FileUploads {...register("idBack", {required: true})} data={"Click to Upload ID Back"}/>
            </div>

            <div className="my-4">
                <p className="mb-2">Registration certificate</p>
                <FileUploads {...register("certificate", {required: true})}
                             data={"Click to Upload your government issued registration certificate"}/>
            </div>
        </main>
    );
}

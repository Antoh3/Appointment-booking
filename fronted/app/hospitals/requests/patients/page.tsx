"use client"
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, Textarea, Checkbox } from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    Pagination,
    TableCell
} from "@nextui-org/react";
import { CiShoppingTag } from "react-icons/ci";
import Link from "next/link";
import React, { Key, use, useEffect, useMemo, useState } from "react";
import { toast } from 'react-hot-toast'
import { getAllRequests, sendRequest,aproveRequests,getPatientRequests,Request } from "../../requests";


export default function page() {
    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
    // const [patientRequests, setPatientRequests] = useState([]);
    const [allRequests, setAllRequests] = useState({
        all_requests: 0,
        patient_requests: 0,
        pendind_patients_requests: 0,
        approved_patient_requests: 0
    })
    const [patientRequest, setPatientRequest] = useState('')
    const [details, setDetails] = useState('')
    const [requests, setRequests] = useState([])
    const [editRequest, setEditRequest] = useState<Request | null>(null);



    const fetchData = async () => {
        const all_request = await getAllRequests()
        const allRequests = await getPatientRequests()
        setRequests(allRequests)
        setAllRequests(all_request)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSendRequest = async (e:React.FormEvent) => {
        e.preventDefault()
        await sendRequest({ request_type: patientRequest, details: details })
        toast.success('Request send',{
            duration:5000
          })
        onClose()
        setPatientRequest('')
        setDetails('')
        fetchData()
    }

    const handleApprove = async (id:number) =>{
        await aproveRequests(id, "Approved")
        const request = await getAllRequests()
        const status = await getPatientRequests()
        toast.success("Request approved",{
            duration:5000
          })
        setAllRequests(request)
        setRequests(status)
        setEditRequest(null)
    }

    

    const requestType = ['patient', 'lab']

    return (
        <main className="flex px-11 py-5 flex-col gap-4">
            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                <CardSummary
                    title="All Requests"
                    value={allRequests.all_requests}
                    className="cursor-pointer"
                ></CardSummary>
                <CardSummary
                    title="Patient Requests"
                    value={allRequests.patient_requests}
                    className="cursor-pointer "
                ></CardSummary>
                <CardSummary
                    title="Approved"
                    value={allRequests.approved_patient_requests}
                    className="cursor-pointer"
                />
                <CardSummary
                    title="Pending"
                    value={allRequests.pendind_patients_requests}
                    className="cursor-pointer"
                />
            </div>
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">All Requets</h2>
                <Button variant="solid" color="primary" className="capitalize" onPress={onOpen}>Send Rquest</Button>
            </div>
            <div>
                <Modal size="xl" placement="center" isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Send Request</ModalHeader>
                                <ModalBody>
                                    <Input
                                        autoFocus
                                        isRequired
                                        placeholder="Patient"
                                        size="sm"
                                        value={patientRequest}
                                        onChange={(e) => setPatientRequest(e.target.value)}
                                        endContent={
                                            <CiShoppingTag
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Request Type"
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Textarea
                                        isRequired
                                        type="text"
                                        variant="bordered"
                                        label="Description"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                    />

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={handleSendRequest}>
                                        Send Request
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <Table aria-label="Bed Table">
                        <TableHeader>
                            <TableColumn>Request  ID</TableColumn>
                            <TableColumn>Request  Type</TableColumn>
                            <TableColumn>Details</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request:any) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.request_type}</TableCell>
                                    <TableCell>{request.detaiils}</TableCell>
                                    <TableCell>
                                        {editRequest && editRequest.id === request.id ? (
                                            <Checkbox
                                                value={editRequest.status}
                                                onChange={(e) => setEditRequest({ ...editRequest, status: e.target.value })}
                                            >
                                                Approve
                                            </Checkbox>
                                        ) : (
                                            request.status ? 'Pending' : 'Approved'
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editRequest && editRequest.id === request.id ? (
                                            <Button onClick={() => handleApprove(request.id!)}>Save</Button>
                                        ) : (
                                            <>
                                                <Button color="secondary" onClick={() => setEditRequest(request)}>Approve</Button>
                                                <Button color="danger" onClick={() => setEditRequest(null)}>Cancel</Button>
                                                {/* <Button color="danger" onClick={() => handleDeleteBed(bed.id!)}>Delete</Button> */}
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

        </main>
    )
}

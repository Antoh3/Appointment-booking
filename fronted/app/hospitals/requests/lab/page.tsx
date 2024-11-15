"use client"
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { Button,Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, Textarea, Checkbox } from "@nextui-org/react";
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
import { getAllRequests, sendRequest,Request,getLabRequests,aproveRequests } from "../../requests";
import { request } from "http";
import { toast } from 'react-hot-toast'

export default function page() {
    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();

    const [allRequests, setAllRequests] = useState({
        all_requests: 0,
        lab_requests: 0,
        pendind_lab_requests: 0,
        approved_lab_requests: 0,
    })
    console.log(allRequests);
    
    const [requests, setRequests] = useState([])
    console.log(requests);
    const [labRequest, setLabRequest] = useState('')
    const [description, setDescription] = useState('')
    const [editRequest, setEditRequest] = useState<Request | null>(null);

    

    const fetchData = async () => {
        const all_request = await getAllRequests()
        const allRequests = await getLabRequests()
        setRequests(allRequests)
        setAllRequests(all_request)
    }

    

    useEffect(() => {
        fetchData()
    }, [])

    const handleSendRequest = async (e:React.FormEvent) => {
        e.preventDefault()
        await sendRequest({ request_type: labRequest, details: description })
        toast.success("Request send succefully",{
            duration:5000
          })
        onClose()
        setLabRequest('')
        setDescription('')
        fetchData()
    }

    const handleApprove = async (id:number) =>{
        await aproveRequests(id, "Approved")
        const request = await getAllRequests()
        const status = await getLabRequests()
        toast.success("Request approved",{
            duration:5000
          })
        setAllRequests(request)
        setRequests(status)
        setEditRequest(null)
    }

    const requestType = ['lab', 'patient']
    return (
        <main className="flex px-11 py-5 flex-col gap-4">
            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                <CardSummary
                    title="All Requests"
                    value={allRequests.all_requests}
                    className="cursor-pointer"
                ></CardSummary>
                <CardSummary
                    title="Lab Requests"
                    value={allRequests.lab_requests}
                    className="cursor-pointer"
                ></CardSummary>
                <CardSummary
                    title="Approved"
                    value={allRequests.approved_lab_requests}
                    className="cursor-pointer"
                />
                <CardSummary
                    title="Pending"
                    value={allRequests.pendind_lab_requests}
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
                                        size="sm"
                                        placeholder="lab"
                                        value={labRequest}
                                        onChange={(e) => setLabRequest(e.target.value)}
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
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
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
            <div>
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
                </div>

        </main>
    )
}

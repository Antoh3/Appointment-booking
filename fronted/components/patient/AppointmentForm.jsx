"use client"

import React from 'react'
import { Button, Card, Input, Modal, Select, Text } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import createAxiosInstance from "@/app/context/axiosInstance";
import { message } from 'antd';

function AppointmentForm() {
    const [openModel, setOpenModel] = useState(false);
    const [formData, setFormData] = useEffect({
        doctorId: '',
        schedule: '',
        reason: '',
    })
    const [doctors, setDoctors] = useState({})
    const axiosInstance = createAxiosInstance();

    const handleOpenModel = () => {
        setOpenModel(true)
    }

    const handleCloseModel = () => {
        setOpenModel(false)
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSearchDoctors = async (query) => {
        try {
            const response = await axiosInstance.get(`http://localhost:5000/doctor/search?query=${query}`)
            setDoctors(response.data);
        } catch (error) {
            console.error("Error in fetching doctors", error);
        }
    }

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post('/appointment/bookAppointment', formData)
            if (response?.status === 200) {
                message.success("Appointment booked");
            }
        } catch (error) {
            console.error('Error in booking appointment');
            handleCloseModel();
        }
    }
    return (
        <div>
            <Button color='primary' onClick={handleOpenModel}>
                Book Appointment
            </Button>
            <Modal isOpen={openModel} onClose={handleCloseModel}>
                <Modal.Header>Book Appointment</Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Input
                                label="Search Doctor"
                                placeholder="Search by name or specialization"
                                onChange={(e) => handleDoctorSearch(e.target.value)}
                            />
                            <Select
                                label="Select Doctor"
                                options={doctors.map((doctor) => ({
                                    value: doctor.id,
                                    label: doctor.firstName,
                                }))}
                                onChange={(selectedDoctor) => {
                                    setFormData({ ...formData, doctorId: selectedDoctor });
                                }}
                            />
                            <Input
                                type="datetime-local"
                                label="Schedule"
                                name="schedule"
                                value={formData.schedule}
                                onChange={handleChange}
                            />
                            <Input
                                label="Reason for Appointment"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                            />
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" auto onClick={handleSubmit}>
                        Book Appointment
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AppointmentForm

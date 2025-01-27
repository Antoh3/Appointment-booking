'use client'

import React, { useState, useEffect } from 'react'
import { Button, Spacer, Card, CardBody } from '@nextui-org/react'
import axios from 'axios'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import VerifyLocation from '@/components/VerifyLocation';
import { message } from 'antd';

const mapContainerStyle = {
    width: '100%',
    height: '500px'
}

interface Location {
    lat: number | any;
    lng: number | any;
}

function TrackAmbulance({ requestId }: { requestId: string | any }) {
    const [ambulanceLocation, setAmbulanceLocation] = useState<Location | null>(null);
    const [patientLocation, setPatientLocation] = useState<Location | null>(null);
    const [distance, setDistance] = useState<string>('');
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [loading, setLoading] = useState(false);


    const fetchAmbulanceData = async (params: any) => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:5000/ambulance/trackambulance/${requestId}`)
            const { location, distance } = response.data;

            const ambulanceCoords = { lat: location.latitude, lng: location.longitude }
            setAmbulanceLocation(ambulanceCoords)
            setDistance(distance);

            if (patientLocation) {
                const directionService = new google.maps.DirectionsService();
                const result = await directionService.route({
                    origin: patientLocation,
                    destination: ambulanceCoords,
                    travelMode: google.maps.TravelMode.DRIVING
                });
                setDirectionsResponse(result);
            }
        } catch (error:any) {
            const errorMessage = error.response?.data?.message || "Failed to fetch ambulances"
            message.error(errorMessage);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        VerifyLocation()
        .then((l:any) => setPatientLocation(l))
        .catch((err) => alert(err.message));
    })

    useEffect(() => {
        if(patientLocation){
            fetchAmbulanceData
        }
    }, [patientLocation])

    return (
        <div style={{padding: '20px'}}>
            <Card>
                <CardBody>
                    <h3>Track Ambulance</h3>
                    <Spacer y={1} />
                    <Button
                     color='primary'
                     onClick={fetchAmbulanceData}
                     disabled={loading}
                    >
                        {loading ? 'Loading' : 'Refresh'}
                    </Button>
                    <Spacer y={1.5} />
                    {distance && (
                        <p>
                            <strong>Distance:</strong> {distance} Km
                        </p>
                    )}
                </CardBody>
            </Card>
            <Spacer y={2} />
            <LoadScript googleMapsApiKey='IzaSyC62FtCuHq-jrC3sMNWBsbkrcYx8IhzwWg'>
                    <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={ambulanceLocation || patientLocation || {lat:0, lng:0}}
                    >
                        {ambulanceLocation && <Marker position={ambulanceLocation} label={"Ambulance"}/>}
                        {patientLocation && <Marker position={patientLocation} label={"Patient"}/>}
                        {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
                    </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default TrackAmbulance

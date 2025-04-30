import React, { useEffect, useState } from 'react'
import './LeafletMap.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ locations, openModal, fetchAllQuizzez }) => {
    const position = [16.9930697, 54.7027669];
    const [zoom, setzoom] = useState(13);

    useEffect(() => {
        const handleResize = () => {
            window.innerWidth < 768 ? setzoom(11) : setzoom(13);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleStartQuiz = async (placeid) => {
        await fetchAllQuizzez(placeid);
        setTimeout(() => {
            openModal();
        }, 500);
    };

    return (
        <div className='leaflet-map'>
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    locations.map((place, index) =>
                    (
                        <Marker key={index} position={[place.latitude, place.longitude]}>
                            <Popup>
                                <div className='popup-heading'>{place.name}</div>
                                <div className='paragraph'>{place.description}</div>
                                <button className='popup-btn' onClick={() => handleStartQuiz(place._id)}>Start Quiz</button>
                            </Popup>
                        </Marker>
                    )
                    )
                }
            </MapContainer>
        </div>
    )
}

export default LeafletMap;

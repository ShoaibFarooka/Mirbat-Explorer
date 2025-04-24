import React, { useEffect, useState } from 'react'
import './LeafletMap.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


const LeafletMap = ({ location, openModal, setSelectedPlace }) => {
    const position = [51.505, -0.09];
    const [zoom, setzoom] = useState(13);

    useEffect(() => {
        const handleResize = () => {
            window.innerWidth < 768 ? setzoom(11) : setzoom(13);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const handleStartQuiz = (place) => {
        setSelectedPlace(place)
        openModal();
    }

    return (
        <div className='leaflet-map'>
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    location.map((place, index) =>
                    (
                        <Marker key={index} position={place.directions}>
                            <Popup>
                                <div className='popup-heading'>{place.name}</div>
                                <div className='paragraph'>{place.description}</div>
                                <button className='popup-btn' onClick={() => handleStartQuiz(place)}>Start Quiz</button>
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

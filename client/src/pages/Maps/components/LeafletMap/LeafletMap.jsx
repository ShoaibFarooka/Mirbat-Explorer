import React, { useEffect, useState } from 'react'
import './LeafletMap.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


const LeafletMap = ({ openModal }) => {
    const position = [51.505, -0.09];
    const [zoom, setzoom] = useState(13);

    useEffect(() => {
        const handleresize = () => {
            window.innerWidth < 768 ? setzoom(11) : setzoom(13);
        }

        window.addEventListener("resize", handleresize);

        return () => window.removeEventListener("resize", handleresize);
    }, [])


    const locations = [
        [51.505, -0.09],
        [51.515, -0.1],
        [51.495, -0.08],
        [51.500, -0.07],
        [51.510, -0.095],
    ];

    return (
        <div className='leaflet-map'>
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {
                    locations.map((pos, index) =>
                        <Marker key={index} position={pos}>
                            <Popup>
                                <div className='popup-heading'>Location Name</div>
                                <div className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt.</div>
                                <button className='popup-btn' onClick={openModal}>Start Quiz</button>
                            </Popup>
                        </Marker>
                    )
                }
            </MapContainer>
        </div>
    )
}

export default LeafletMap;

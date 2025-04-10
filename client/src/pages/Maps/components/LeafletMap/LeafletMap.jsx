import React from 'react'
import './LeafletMap.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


const LeafletMap = () => {
    const position = [51.505, -0.09];

    return (
        <div className='leaflet-map'>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={[51.505, -0.08]}>
                    <Popup>
                        <h1>Title</h1>
                        <p>description description description description description description description description description description gjfg</p>
                        <button>Start Quiz</button>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default LeafletMap;

import React, { useEffect, useState } from 'react'
import './LeafletMap.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ReactGA from 'react-ga4';

const LeafletMap = ({ locations, openModal, fetchAllQuizzez }) => {
    const position = [16.9930697, 54.7027669];
    const [zoom, setzoom] = useState(13);
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            window.innerWidth < 768 ? setzoom(11) : setzoom(13);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleStartQuiz = async (placeid, placeName) => {
        ReactGA.event({
            category: 'User',
            action: 'click',
            label: "Start Quiz Button",
            place_name: placeName
        });
        await fetchAllQuizzez(placeid);
        setTimeout(() => {
            openModal();
        }, 500);
    };

    return (
        <div className='leaflet-map'>
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />

                {
                    locations.map((place, index) =>
                    (
                        <Marker key={index} position={[place.latitude, place.longitude]} eventHandlers={{ click: () => setShowDescription(false) }}>
                            <Popup>
                                <div className='popup-heading'>{place.name}</div>
                                {place.imageUrl && <img className='place-image' crossorigin="anonymous" src={import.meta.env.VITE_BASE_URL + '/' + place.imageUrl} alt='place-image' />}
                                {showDescription ?
                                    <div className='paragraph'>{place.description}</div>
                                    :
                                    <div className='learn-more' onClick={() => setShowDescription(true)}>Learn More...</div>
                                }
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {place.videoUrl && (
                                        <button
                                            className='popup-btn'
                                            style={{ marginTop: '8px' }}
                                            onClick={() => {
                                                window.open(
                                                    place.videoUrl,
                                                    'VideoPopup',
                                                    'width=800,height=450,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes'
                                                );
                                            }}
                                        >
                                            Watch Video
                                        </button>

                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <button className='popup-btn' onClick={() => handleStartQuiz(place._id, place.name)}>Test your knowledge</button>
                                </div>


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

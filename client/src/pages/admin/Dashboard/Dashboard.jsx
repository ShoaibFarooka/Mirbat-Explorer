import React, { useEffect, useState } from 'react'
import './Dashboard.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import PlaceInfo from './components/PlaceInfo/PlaceInfo';
import CustomModal from '../../../components/CustomModal/CustomModal';
import AddPlace from './components/AddPlace/AddPlace';
import userService from '../../../services/userService';
import Cookies from 'js-cookie';
import { message } from 'antd';
import placeService from '../../../services/placeService';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [places, setPlaces] = useState([]);

    const handleAddPlace = () => {
        setIsOpen(true);
    }

    const onRequestClose = () => {
        setIsOpen(false);
    }

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const payload = {}
            const response = await userService.logoutUser(payload);
            console.log('Response', response);
            Cookies.remove("mirbat-jwt-token");
            navigate('/admin/login');
        } catch (error) {
            message.error("Error Logout Failed!");
        }
    }

    const fetchAllPlaces = async () => {
        try {
            const response = await placeService.getAllPlaces();
            console.log('response', response.places);
            setPlaces(response.places);
        } catch (error) {
            message.error("Error No Places Available!");
        }
    }

    useEffect(() => {
        fetchAllPlaces();
    }, []);

    return (
        <div className='dashboard'>
            <div className='navbar'>
                <NavLink to='/' className='logo-container'>
                    <img
                        src={logo}
                        alt="Logo"
                        className='logo-img'
                    />
                </NavLink>

                <NavLink
                    className='logout'
                    onClick={handleLogout}>
                    Logout
                </NavLink>
            </div>
            <div className='content'>
                <div className="heading h1">Places</div>
                <div className='add-btn'>
                    <button className='addplace' onClick={handleAddPlace}>Add place</button>
                </div>

                <CustomModal
                    isOpen={isOpen}
                    onRequestClose={onRequestClose}
                    contentLabel={"Add Place"}
                >
                    <AddPlace
                        onRequestClose={onRequestClose}
                        fetchAllPlaces={fetchAllPlaces}
                    />
                </CustomModal>

                <div className='info-container'>
                    <div className='info'>
                        <div className="heading">Name</div>
                        <div className="heading">Description</div>
                        <div className="heading">Longitude</div>
                        <div className="heading">Latitude</div>
                        <div className="heading">Action</div>
                    </div>
                    {places.map((data, index) =>
                        <PlaceInfo
                            key={index}
                            data={data}
                            fetchAllPlaces={fetchAllPlaces}
                        />
                    )}
                </div>

            </div>
        </div>
    )
}

export default Dashboard;

import React, { useState } from 'react'
import './Dashboard.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import Placeinfo from './Components/placeinfo/Placeinfo';
import CustomModal from '../../../components/CustomModal/CustomModal';
import Addplace from './Components/Addplace/Addplace';

const Dashboard = () => {
    const [isOpen, setisOpen] = useState(false);
    const [isOpeninfomodal, setisOpeninfomodal] = useState(false);

    const handleaddplace = () => {
        setisOpen(true);
    }

    const onRequestClose = () => {
        setisOpen(false);
    }

    return (
        <div className='dashboard'>
            <div className='navbar'>
                <NavLink to='/' className='logo-container'>
                    <img src={logo} alt="Logo" className='logo-img' />
                </NavLink>
            </div>
            <div className="heading h1">Places</div>
            <div className='add-btn'>
                <button className='addplace' onClick={handleaddplace}>Add place</button>
            </div>
            <CustomModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={"Add Place"}>
                <Addplace onRequestClose={onRequestClose} />
            </CustomModal>
            <div className='info'>
                <div className="heading">Name</div>
                <div className="heading">Description</div>
                <div className="heading">Longitude</div>
                <div className="heading">Latitude</div>
                <div className="heading">Action</div>
            </div>
            <Placeinfo isOpen={isOpeninfomodal} setisOpen={setisOpeninfomodal} />
        </div>
    )
}

export default Dashboard

import React, { useState } from 'react'
import del from '../../../../../assets/icons/del.png';
import edit from '../../../../../assets/icons/edit.png';
import './placeinfo.css'
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import Editplace from '../Addplace/Components/Quizinfo/EditPlace/Editplace';
const Placeinfo = ({ isOpen, setisOpen }) => {

    const handleclickedit = () => {
        setisOpen(true);
    }

    const handlecloseinfomodal = () => {
        setisOpen(false);
    }

    return (
        <div className='places-info'>
            <div className="placeholder">place holder</div>
            <div className="placeholder">place holder</div>
            <div className="placeholder">place holder</div>
            <div className="placeholder">place holder</div>
            <div className="icons">
                <button className='edit-btn' onClick={handleclickedit}>
                    <img src={edit} alt="" />
                </button>
                <CustomModal isOpen={isOpen} onRequestClose={handlecloseinfomodal} contentLabel={"Edit Place"}>
                    <Editplace />
                </CustomModal>
                <button className='delete-btn'>
                    <img src={del} alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default Placeinfo

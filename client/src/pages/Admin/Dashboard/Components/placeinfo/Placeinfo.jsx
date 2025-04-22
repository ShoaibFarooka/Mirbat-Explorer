import React, { useEffect, useState } from 'react'
import del from '../../../../../assets/icons/del.png';
import edit from '../../../../../assets/icons/edit.png';
import { Popconfirm } from 'antd';
import './PlaceInfo.css'
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import Editplace from '../Addplace/Components/Quizinfo/EditPlace/Editplace';
import placeService from '../../../../../services/placeService';

const PlaceInfo = ({ data, fetchAllPlaces }) => {

    const [isOpen, setisOpen] = useState(false);

    const handleclickedit = () => {
        setisOpen(true);
    }

    const handlecloseinfomodal = () => {
        setisOpen(false);
    }

    const handleDeletePlace = async (id) => {
        try {
            const response = await placeService.deletePlace(id);
            console.log('response', response);
            fetchAllPlaces();
        } catch (error) {
            message.error("failed an error occured");
            console.log('error', error);
        }
    }

    return (
        <div className='places-info'>
            <div className=" name">{data.name}</div>
            <div className=" description">{data.description}</div>
            <div className="longitude">{data.longitude}</div>
            <div className="latitude">{data.latitude}</div>
            <div className="icons">
                <button className='edit-btn' onClick={handleclickedit}>
                    <img src={edit} alt="" />
                </button>
                <CustomModal isOpen={isOpen} onRequestClose={handlecloseinfomodal} contentLabel={"Edit Place"}>
                    <Editplace placeData={data} />
                </CustomModal>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => handleDeletePlace(data._id)}
                    onCancel={() => { }}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className='delete-btn'>
                        <img src={del} alt="delete" />
                    </button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default PlaceInfo

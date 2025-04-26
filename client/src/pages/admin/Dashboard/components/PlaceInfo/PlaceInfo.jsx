import React, { useState } from 'react'
import del from '../../../../../assets/icons/del.png';
import edit from '../../../../../assets/icons/edit.png';
import { Popconfirm } from 'antd';
import './PlaceInfo.css'
import AddQuiz from '../AddQuiz/AddQuiz';
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import EditPlace from '../EditPlace/EditPlace';
import placeService from '../../../../../services/placeService';

const PlaceInfo = ({ data, fetchAllPlaces }) => {

    const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false);
    const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);

    const handleClickEdit = () => {
        setIsEditPlaceOpen(true);
    }

    const handleCloseInfoModal = () => {
        setIsEditPlaceOpen(false);
    }

    const handleOpenAddQuiz = () => {
        handleCloseInfoModal();
        setTimeout(() => {
            setIsAddQuizOpen(true);
        }, 300);
    }

    const handleCloseAddQuiz = () => {
        setIsAddQuizOpen(false);
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
            <div className="name">{data.name}</div>
            <div className="description">{data.description}</div>
            <div className="longitude">{data.longitude}</div>
            <div className="latitude">{data.latitude}</div>
            <div className="icons">
                <button className='edit-btn' onClick={handleClickEdit}>
                    <img src={edit} alt="" />
                </button>


                <CustomModal isOpen={isEditPlaceOpen} onRequestClose={handleCloseInfoModal} contentLabel={"Edit Place"}>
                    <EditPlace placeData={data} fetchAllPlaces={fetchAllPlaces} onRequestClose={handleCloseInfoModal} handleOpenAddQuiz={handleOpenAddQuiz} />
                </CustomModal>

                <CustomModal isOpen={isAddQuizOpen} onRequestClose={handleCloseAddQuiz} contentLabel={"Add Quiz"}>
                    <AddQuiz closeAddQuizModal={handleCloseAddQuiz} placeData={data} setIsEditPlaceOpen={setIsEditPlaceOpen} />
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

export default PlaceInfo;

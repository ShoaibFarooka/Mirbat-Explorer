import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import Quizinfo from '../QuizInfo/QuizInfo';
import './EditPlace.css'
import placeService from '../../../../../services/placeService';
import { useNavigate } from 'react-router-dom';

const EditPlace = ({ placeData, fetchAllPlaces, handleCloseEditPlace, handleOpenAddQuiz, fetchAllQuizzez, quizzez, handleOpenEditQuiz }) => {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: placeData?.name || "",
        description: placeData?.description || "",
        longitude: placeData?.longitude || "",
        latitude: placeData?.latitude || "",
    });
    const [error, setError] = useState({
        name: "",
        description: "",
        longitude: "",
        latitude: "",
    });

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const isValidateLatitude = (lat) => lat >= -90 && lat <= 90;
    const isValidateLongitude = (lon) => lon >= -180 && lon <= 180;


    const validateData = () => {
        let newerror = {};
        let haserrors = false;

        if (formData.name.trim() === "") {
            newerror.name = "Name is mandatory!";
            haserrors = true;
        } else {
            newerror.name = "";
        }
        if (formData.description.trim() === "") {
            newerror.description = "Description is required!";
            haserrors = true;
        } else {
            newerror.description = ""
        }
        if (formData.longitude === "" || formData.longitude === null || formData.longitude === undefined) {
            newerror.longitude = "Longitude is required!";
            haserrors = true;
        } else if (isNaN(formData.longitude)) {
            newerror.longitude = "Longitude must be a valid number!";
            haserrors = true;
        } else if (!isValidateLongitude(formData.longitude)) {
            newerror.longitude = "Longitude must be between -180 and 180!";
            haserrors = true;
        } else {
            newerror.longitude = "";
        }
        if (formData.latitude === "" || formData.latitude === null || formData.latitude === undefined) {
            newerror.latitude = "Latitude is required!";
            haserrors = true;
        } else if (isNaN(formData.latitude)) {
            newerror.latitude = "Latitude must be a valid number!";
            haserrors = true;
        } else if (!isValidateLatitude(formData.latitude)) {
            newerror.latitude = "Latitude must be between -90 and 90!";
            haserrors = true;
        } else {
            newerror.latitude = "";
        }
        setError((prev) => ({ ...prev, ...newerror }));
        return !haserrors;
    }

    const handleUpdatePlace = async (id, data) => {
        if (!validateData()) {
            return;
        }
        const updatedata = {
            ...data,
            longitude: parseFloat(data.longitude),
            latitude: parseFloat(data.latitude)
        }
        try {
            const response = await placeService.updatePlace(id, updatedata);
            console.log('response', response);
            message.success("Place Updated Sucessfully!");
            handleCloseEditPlace();
            fetchAllPlaces();
            navigate('/admin/dashboard');
        } catch (error) {
            message.error("Error Failed to update!");
            console.log("Error", error);
        }
    }

    useEffect(() => {
        fetchAllQuizzez();
    }, [])

    const handleClickBack = () => {
        handleCloseEditPlace();
    }

    return (
        <div className='add-place'>
            <div className="heading h1">Place Information</div>

            <div className='form'>
                <label
                    htmlFor="name"
                    className='label'>Place name</label>
                <input
                    type="text"
                    name='name'
                    placeholder='Place name'
                    value={formData.name}
                    onChange={handleOnChange} />
                {error.name && <span className='error'>{error.name}</span>}

                <label
                    htmlFor="description"
                    className='label description'>Description</label>
                <input
                    type="text"
                    name='description'
                    placeholder='Description'
                    value={formData.description}
                    onChange={handleOnChange} />
                {error.description && <span className='error'>{error.description}</span>}


                <div className='position'>

                    <div className='longitude'>
                        <label
                            htmlFor="longitude"
                            className='label'>Longitude</label>
                        <input
                            type="number"
                            name='longitude'
                            placeholder='Longitude'
                            value={formData.longitude}
                            onChange={handleOnChange} />
                        {error.longitude && <span className='error'>{error.longitude}</span>}

                    </div>

                    <div className='latitude'>

                        <label
                            htmlFor="latitude"
                            className='label'>Latitude</label>
                        <input
                            type="number"
                            name='latitude'
                            placeholder='Latitude'
                            value={formData.latitude}
                            onChange={handleOnChange} />
                        {error.latitude && <span className='error'>{error.latitude}</span>}


                    </div>
                </div>
            </div>

            <div className='quiz-save'>
                <button className='back-btn' onClick={handleClickBack}>{`< Back`}</button>
                <button
                    className='save-btn'
                    onClick={() => handleUpdatePlace(placeData._id, formData)}>Save
                </button>

            </div>

            <div className='quizez-info'>
                <div className='heading quiz-heading'>
                    Quiz
                    <button
                        className='add-quiz-btn'
                        onClick={handleOpenAddQuiz}>
                        Add Quiz
                    </button>
                </div>


                <div className='quiz-info'>
                    <div className="heading">Title</div>
                    <div className="heading">Total <br />Time</div>
                    <div className="heading">Passing <br /> Marks</div>
                    <div className="heading">Action</div>
                </div>
            </div>

            <div className='quizinfo-edit'>
                {
                    quizzez.map((quizData, index) =>
                        <Quizinfo
                            key={index}
                            quizData={quizData}
                            placeData={placeData}
                            handleOpenEditQuiz={handleOpenEditQuiz}
                            fetchAllQuizzez={fetchAllQuizzez}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default EditPlace;

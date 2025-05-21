import React, { useState } from 'react'
import './AddPlace.css'
import { message } from 'antd';
import placeService from '../../../../../services/placeService';
import { useNavigate } from 'react-router-dom';

const AddPlace = ({ onRequestClose, fetchAllPlaces }) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        longitude: "",
        latitude: "",
        videoUrl: "",
    });

    const [error, setError] = useState({
        name: "",
        description: "",
        longitude: "",
        latitude: "",
        videoUrl: "",
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

    const navigate = useNavigate();

    const handleClickSave = async () => {
        if (!validateData()) {
            return;
        } try {
            const response = await placeService.addPlace(formData);
            console.log('response', response);
            message.success("Place added successfully!");
            fetchAllPlaces();
            navigate("/admin/dashboard");
            onRequestClose();
        } catch (error) {
            message.error("Error failed to add place!");
        }
    }

    return (
        <div className='add-place'>
            <div className="heading">Place Information</div>
            <div className='form'>
                <label htmlFor="name" className='label'>Place name</label>
                <input type="text" name='name' placeholder='Place name' value={formData.name} onChange={handleOnChange} />
                {error.name && <span className='error'>{error.name}</span>}
                <label htmlFor="description" className='label description'>Description</label>
                <textarea classname="input" name='description' placeholder='Description' value={formData.description} onChange={handleOnChange} rows={5} />
                {error.description && <span className='error'>{error.description}</span>}
                <div className='position'>
                    <div className='longitude'>
                        <label htmlFor="longitude" className='label'>Longitude</label>
                        <input type="number" name='longitude' placeholder='Longitude' value={formData.longitude} onChange={handleOnChange} />
                        {error.longitude && <span className='error'>{error.longitude}</span>}
                    </div>
                    <div className='latitude'>
                        <label htmlFor="latitude" className='label'>Latitude</label>
                        <input type="number" name='latitude' placeholder='Latitude' value={formData.latitude} onChange={handleOnChange} />
                        {error.latitude && <span className='error'>{error.latitude}</span>}
                    </div>
                </div>

                <label htmlFor="videoUrl" className='label'>Video URL (optional)</label>
                <input type="text" name='videoUrl' placeholder='https://example.com/video' value={formData.videoUrl} onChange={handleOnChange}/>
                {error.videoUrl && <span className="error">{error.videoUrl}</span>}

            </div>

            <div className='save'><button className='save-btn' onClick={handleClickSave}>Save</button></div>
        </div>
    )
}

export default AddPlace;

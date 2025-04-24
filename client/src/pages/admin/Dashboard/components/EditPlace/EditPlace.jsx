import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import 'antd/dist/reset.css';
import Quizinfo from '../QuizInfo/QuizInfo';
import AddQuiz from '../AddQuiz/AddQuiz';
import './EditPlace.css'
import placeService from '../../../../../services/placeService';
import { useNavigate } from 'react-router-dom';
import quizService from '../../../../../services/quizService';
import CustomModal from '../../../../../components/CustomModal/CustomModal';

const EditPlace = ({ placeData, fetchAllPlaces, onRequestClose }) => {

    const [isOpen, setIsOpen] = useState(false);

    const openAddQuizModal = () => {
        setIsOpen(true);
    }

    const closeAddQuizModal = () => {
        setIsOpen(false);
    }

    const navigate = useNavigate();

    const [formdata, setformdata] = useState({
        name: placeData?.name || "",
        description: placeData?.description || "",
        longitude: placeData?.longitude || "",
        latitude: placeData?.latitude || "",
    });
    const [error, seterror] = useState({
        name: "",
        description: "",
        longitude: "",
        latitude: "",
    });

    const handleonchnage = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const isValidLatitude = (lat) => lat >= -90 && lat <= 90;
    const isValidLongitude = (lon) => lon >= -180 && lon <= 180;


    const validatedata = () => {
        let newerror = {};
        let haserrors = false;

        if (formdata.name.trim() === "") {
            newerror.name = "Name is mandatory!";
            haserrors = true;
        } else {
            newerror.name = "";
        }
        if (formdata.description.trim() === "") {
            newerror.description = "Description is required!";
            haserrors = true;
        } else {
            newerror.description = ""
        }
        if (formdata.longitude === "" || formdata.longitude === null || formdata.longitude === undefined) {
            newerror.longitude = "Longitude is required!";
            haserrors = true;
        } else if (isNaN(formdata.longitude)) {
            newerror.longitude = "Longitude must be a valid number!";
            haserrors = true;
        } else if (!isValidLongitude(formdata.longitude)) {
            newerror.longitude = "Longitude must be between -180 and 180!";
            haserrors = true;
        } else {
            newerror.longitude = "";
        }
        if (formdata.latitude === "" || formdata.latitude === null || formdata.latitude === undefined) {
            newerror.latitude = "Latitude is required!";
            haserrors = true;
        } else if (isNaN(formdata.latitude)) {
            newerror.latitude = "Latitude must be a valid number!";
            haserrors = true;
        } else if (!isValidLatitude(formdata.latitude)) {
            newerror.latitude = "Latitude must be between -90 and 90!";
            haserrors = true;
        } else {
            newerror.latitude = "";
        }
        seterror((prev) => ({ ...prev, ...newerror }));
        return !haserrors;
    }

    const handleUpdatePlace = async (id, data) => {
        const updatedata = {
            ...data,
            longitude: parseFloat(data.longitude),
            latitude: parseFloat(data.latitude)
        }
        if (!validatedata()) {
            return;
        } try {
            const response = await placeService.updatePlace(id, updatedata);
            console.log('response', response);
            message.success("Place Updated Sucessfully!");
            onRequestClose();
            fetchAllPlaces();
            navigate('/admin/dashboard');
        } catch (error) {
            message.error("Error Failed to update!");
            console.log("Error", error);
        }
    }

    const [quizzez, setQuizzez] = useState([]);

    const fetchAllQuizzez = async () => {
        try {
            const response = await quizService.getAllQuizzes(placeData._id);
            console.log("response", response);
            setQuizzez(response.quizzes);
        } catch (error) {
            console.log("error", error);
            message.error("Error During Fetching Quizzez...");
        }
    }

    useEffect(() => {
        fetchAllQuizzez();
    }, [])

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
                    value={formdata.name}
                    onChange={handleonchnage} />
                {error.name && <span className='error'>{error.name}</span>}

                <label
                    htmlFor="description"
                    className='label description'>Description</label>
                <input
                    type="text"
                    name='description'
                    placeholder='Description'
                    value={formdata.description}
                    onChange={handleonchnage} />
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
                            value={formdata.longitude}
                            onChange={handleonchnage} />
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
                            value={formdata.latitude}
                            onChange={handleonchnage} />
                        {error.latitude && <span className='error'>{error.latitude}</span>}


                    </div>
                </div>
            </div>

            <div className='save'>
                <button
                    className='save-btn'
                    onClick={() => handleUpdatePlace(placeData._id, formdata)}>Save
                </button>
            </div>

            <div className='quizez-info'>
                <div className='heading quiz-heading'>
                    Quiz
                    <button
                        className='add-quiz-btn'
                        onClick={openAddQuizModal}>
                        Add Quiz
                    </button>
                </div>

                <CustomModal isOpen={isOpen} onRequestClose={closeAddQuizModal} contentLabel={"Add Quiz"}>
                    <AddQuiz closeAddQuizModal={closeAddQuizModal} placeData={placeData} fetchAllQuizzez={fetchAllQuizzez} />
                </CustomModal>

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
                            fetchAllQuizzez={fetchAllQuizzez}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default EditPlace;

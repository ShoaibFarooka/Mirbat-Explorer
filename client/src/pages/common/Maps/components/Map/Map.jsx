import React, { useEffect, useRef, useState } from 'react'
import './Map.css'
import places from '../../../../../data/places.json'
import Popular from '../PopularPlaces/Popular'
import LeafletMap from '../LeafletMap/LeafletMap'
import Quiz from '../Quiz/Quiz'
import placeService from '../../../../../services/placeService'
import quizService from '../../../../../services/quizService'
import questionService from '../../../../../services/questionService'
import CustomModal from '../../../../../components/CustomModal/CustomModal'

const Map = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const [quizzez, setQuizzez] = useState([]);
    const [questions, setQuestions] = useState([]);


    const fetchLocations = async () => {
        try {
            const response = await placeService.getAllPlaces();
            console.log("response", response);
            setLocations(response.places);
        } catch (error) {
            console.log("error", error);
        }
    }

    const fetchAllQuizzez = async (placeid) => {
        try {
            const response = await quizService.getAllQuizzes(placeid);
            console.log("response", response);
            setQuizzez(response.quizzes);
        } catch (error) {
            console.log("error", error);
        }
    }

    const fetchAllQuestion = async () => {
        if (quizzez.length > 0) {
            const quizid = quizzez[0]._id;
            try {
                const response = await questionService.getAllQuestions(quizid);
                console.log("response", response);
                setQuestions(response.questions);
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    useEffect(() => {
        if (quizzez.length > 0) {
            fetchAllQuestion();
        }
    }, [quizzez])


    const openModal = () => {
        setIsOpen(true);
    }

    const onRequestClose = () => {
        setIsOpen(false);
        setQuizzez([]);
        setQuestions([]);
    }


    return (
        <section className='Map'>
            <div className='heading'>Maps</div>
            <div className='paragraph'></div>

            <LeafletMap locations={locations} openModal={openModal} fetchAllQuizzez={fetchAllQuizzez} />

            {quizzez.length > 0 && questions.length > 0 && (
                <CustomModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Quiz">
                    <Quiz quiz={quizzez[0]} question={questions} setIsOpen={setIsOpen} />
                </CustomModal>
            )}
            <div className='heading heading-2'>Popular Locations in Mirbat.</div>
            <div className="places">
                {
                    places.map((place, index) =>
                        <Popular key={index} data={place} />)
                }
            </div>
        </section>
    )
}

export default Map;

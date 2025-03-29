import React, { useEffect, useState } from 'react'
import './Map.css'
import Popular from '../PopularPlaces/Popular'
import LeafletMap from '../LeafletMap/LeafletMap'
import places from '../../../../data/places.json'
import Quiz from '../Quiz/Quiz'
import CustomModal from '../../../../components/CustomModal/CustomModal'
import Pass from '../Pass/Pass'
import Failed from '../Failed/Failed'

const Map = () => {
    const [isOpen, setisOpen] = useState(false);
    const [score, setscore] = useState(0);
    const [finished, setfinished] = useState(false);

    const staticPlaces = [
        {
            id: 1,
            name: "",
            description: "",
            directions: [51.505, -0.09], // longitude and latitude
            quiz: {
                totalQuestions: 5,
                totalTime: 120,
                passingMarks: 3,
                questions: [
                    {
                        id: 1,
                        title: "",
                        options: {
                            A: "",
                            B: "",
                            C: "",
                            D: "",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 2,
                        title: "",
                        options: {
                            A: "",
                            B: "",
                            C: "",
                            D: "",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 3,
                        title: "",
                        options: {
                            A: "",
                            B: "",
                            C: "",
                            D: "",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 4,
                        title: "",
                        options: {
                            A: "",
                            B: "",
                            C: "",
                            D: "",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 5,
                        title: "",
                        options: {
                            A: "",
                            B: "",
                            C: "",
                            D: "",
                        },
                        correctOption: "A"
                    }
                ]
            }
        },
        //create multiple places here
    ];

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        //get data from an api
        setPlaces(staticPlaces);
    }, []);

    const openModal = () => {

        setisOpen(true);
    }

    const onRequestClose = () => {
        setisOpen(false);
        setfinished(false);
    }

    const update = (score) => {
        setscore(score);
        setfinished(true);
    }
    return (
        <section className='Map'>
            <div className='heading'>Maps</div>
            <div className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

            <LeafletMap places={places} openModal={openModal} />
            <CustomModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={"Quiz"}>
                {!finished ? (
                    <Quiz quiz={{ ...selectedPlace.quiz, name: selectedPlace.name }} update={update} />
                ) : (
                    score < 3 ? (
                        <Pass score={score} setfinished={setfinished} setisOpen={setisOpen} />
                    ) : (
                        <Failed score={score} setfinished={setfinished} setisOpen={setisOpen} />
                    )
                )}
            </CustomModal>
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

export default Map

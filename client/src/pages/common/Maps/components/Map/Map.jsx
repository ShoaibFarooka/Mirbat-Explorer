import React, { useEffect, useState } from 'react'
import './Map.css'
import places from '../../../../../data/places.json'
import Popular from '../PopularPlaces/Popular'
import LeafletMap from '../LeafletMap/LeafletMap'
import Quiz from '../Quiz/Quiz'
import CustomModal from '../../../../../components/CustomModal/CustomModal'

const Map = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const staticPlaces = [
        {
            id: 1,
            name: "Eiffel Tower",
            description: "An iconic landmark in Paris, France, known for its iron lattice structure.",
            directions: [51.505, -0.09],
            quiz: {
                totalQuestions: 5,
                totalTime: 120,
                passingMarks: 3,
                questions: [
                    {
                        id: 1,
                        title: "Who designed the Eiffel Tower?",
                        options: {
                            A: "Gustave Eiffel",
                            B: "Leonardo da Vinci",
                            C: "Albert Einstein",
                            D: "Thomas Edison",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 2,
                        title: "When was the Eiffel Tower built?",
                        options: {
                            A: "1889",
                            B: "1920",
                            C: "1856",
                            D: "1901",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 3,
                        title: "What is the height of the Eiffel Tower?",
                        options: {
                            A: "324 meters",
                            B: "250 meters",
                            C: "500 meters",
                            D: "600 meters",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 4,
                        title: "The Eiffel Tower is located in which city?",
                        options: {
                            A: "Paris",
                            B: "London",
                            C: "Rome",
                            D: "New York",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 5,
                        title: "What material was mainly used to construct the Eiffel Tower?",
                        options: {
                            A: "Wrought iron",
                            B: "Concrete",
                            C: "Steel",
                            D: "Wood",
                        },
                        correctOption: "A"
                    }
                ]
            }
        },
        {
            id: 2,
            name: "Great Wall of China",
            description: "A historic fortification stretching across northern China.",
            directions: [51.504, -0.08],
            quiz: {
                totalQuestions: 5,
                totalTime: 120,
                passingMarks: 3,
                questions: [
                    {
                        id: 1,
                        title: "What was the Great Wall of China built for?",
                        options: {
                            A: "Defense",
                            B: "Tourism",
                            C: "Trade",
                            D: "Decoration",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 2,
                        title: "How long is the Great Wall of China?",
                        options: {
                            A: "21,196 km",
                            B: "5,000 km",
                            C: "10,000 km",
                            D: "15,000 km",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 3,
                        title: "Which Chinese emperor initiated the construction of the Great Wall?",
                        options: {
                            A: "Qin Shi Huang",
                            B: "Mao Zedong",
                            C: "Sun Yat-sen",
                            D: "Liu Bang",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 4,
                        title: "Which material was mainly used to build the Great Wall?",
                        options: {
                            A: "Stone and bricks",
                            B: "Wood",
                            C: "Glass",
                            D: "Steel",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 5,
                        title: "Which dynasty significantly expanded the Great Wall?",
                        options: {
                            A: "Ming Dynasty",
                            B: "Qing Dynasty",
                            C: "Tang Dynasty",
                            D: "Song Dynasty",
                        },
                        correctOption: "A"
                    }
                ]
            }
        },
        {
            id: 3,
            name: "Statue of Liberty",
            description: "A symbol of freedom and democracy located in New York, USA.",
            directions: [51.503, -0.07],
            quiz: {
                totalQuestions: 5,
                totalTime: 120,
                passingMarks: 3,
                questions: [
                    {
                        id: 1,
                        title: "Who gifted the Statue of Liberty to the USA?",
                        options: {
                            A: "France",
                            B: "Germany",
                            C: "United Kingdom",
                            D: "Canada",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 2,
                        title: "What does the Statue of Liberty hold in her right hand?",
                        options: {
                            A: "A torch",
                            B: "A sword",
                            C: "A shield",
                            D: "A book",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 3,
                        title: "In which city is the Statue of Liberty located?",
                        options: {
                            A: "New York",
                            B: "Los Angeles",
                            C: "Washington, D.C.",
                            D: "Chicago",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 4,
                        title: "What is the Statue of Liberty made of?",
                        options: {
                            A: "Copper",
                            B: "Bronze",
                            C: "Marble",
                            D: "Steel",
                        },
                        correctOption: "A"
                    },
                    {
                        id: 5,
                        title: "Who designed the Statue of Liberty?",
                        options: {
                            A: "Frédéric Auguste Bartholdi",
                            B: "Gustave Eiffel",
                            C: "Andrew Carnegie",
                            D: "Thomas Jefferson",
                        },
                        correctOption: "A"
                    }
                ]
            }
        }
    ];


    useEffect(() => {
        //get data from an api
        setLocation(staticPlaces);
    }, []);

    const openModal = () => {
        setIsOpen(true);
    }

    const onRequestClose = () => {
        setIsOpen(false);
    }
    return (
        <section className='Map'>
            <div className='heading'>Maps</div>
            <div className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

            <LeafletMap location={location} openModal={openModal} setSelectedPlace={setSelectedPlace} />

            <CustomModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={"Quiz"}>
                {selectedPlace && selectedPlace.quiz ? (
                    <Quiz quiz={{ ...selectedPlace.quiz, name: selectedPlace.name }} setIsOpen={setIsOpen} />
                ) : (
                    <p>Loading quiz...</p>
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

export default Map;

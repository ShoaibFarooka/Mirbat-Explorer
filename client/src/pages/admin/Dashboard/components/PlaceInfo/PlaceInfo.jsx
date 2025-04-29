import React, { useState } from 'react'
import del from '../../../../../assets/icons/del.png';
import edit from '../../../../../assets/icons/edit.png';
import { message, Popconfirm } from 'antd';
import './PlaceInfo.css'
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import AddQuiz from '../AddQuiz/AddQuiz';
import EditPlace from '../EditPlace/EditPlace';
import EditQuiz from '../EditQuiz/EditQuiz';
import AddQuestion from '../AddQuestion/AddQuestion'
import EditQuestion from '../EditQuestion/EditQuestion';
import placeService from '../../../../../services/placeService';
import quizService from '../../../../../services/quizService';
import questionService from '../../../../../services/questionService';

const PlaceInfo = ({ data, fetchAllPlaces }) => {

    const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false);
    const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);
    const [isOpenEditQuiz, setIsOpenEditQuiz] = useState(false);
    const [quizzez, setQuizzez] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [questionData, setQuestionData] = useState([]);
    const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
    const [isOpenEditQuestion, setIsOpenEditQuestion] = useState(false);
    const [selctedQuestion, setSelectedQuestion] = useState(null);



    const handleOpenEditPlace = () => {
        setIsEditPlaceOpen(true);
    }

    const handleCloseEditPlace = () => {
        setIsEditPlaceOpen(false);
    }

    const handleOpenAddQuiz = () => {
        handleCloseEditPlace();
        setTimeout(() => {
            setIsAddQuizOpen(true);
        }, 300);
    }

    const handleCloseAddQuiz = () => {
        setIsAddQuizOpen(false);
    }

    const handleOpenEditQuiz = (quiz) => {
        handleCloseEditPlace();
        setSelectedQuiz(quiz);
        setTimeout(() => {
            setIsOpenEditQuiz(true);
        }, 300);
    }

    const handleCloseEditQuiz = () => {
        setIsOpenEditQuiz(false);
        setTimeout(() => {
            handleOpenEditPlace()
        }, 300);
    }

    const handleOpenAddQuestion = () => {
        handleCloseEditQuiz();
        handleCloseEditPlace();
        setTimeout(() => {
            setIsOpenAddQuestion(true);
        }, 300);
    }

    const handleCloseAddquestion = () => {
        setIsOpenAddQuestion(false);
        setTimeout(() => {
            setIsOpenEditQuiz(true);
        }, 300);
    }

    const handleOpenEditQuestion = (question) => {
        handleCloseEditPlace();
        handleCloseEditQuiz();
        setSelectedQuestion(question);
        setTimeout(() => {
            setIsOpenEditQuestion(true);
        }, 300);
    }

    const handleCloseEditQuestion = () => {
        setIsOpenEditQuestion(false);
        setIsOpenEditQuiz(true);
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

    const fetchAllQuizzez = async () => {
        try {
            const response = await quizService.getAllQuizzes(data._id);
            console.log("response", response);
            setQuizzez(response.quizzes);
        } catch (error) {
            if (quizzez.length === 0) {
                message.error("Add quiz no quizzez avalible for this place!");
            } else {
                message.error("Server Error!");
                console.log("error", error);
            }
        }
    }

    const fetchAllQuestions = async () => {
        try {
            const resposne = await questionService.getAllQuestions(selectedQuiz._id);
            console.log("response", resposne);
            setQuestionData(resposne.questions);
        } catch (error) {
            console.log("Questions", questionData);
            if (questionData.length === 0) {
                message.error("Add Questions no questions avalaibel for this quiz!");
            } else {
                console.log("error", error);
                message.error("Server Error!");
            }
        }
    }



    return (
        <div className='places-info'>
            <div className="name">{data.name}</div>
            <div className="description">{data.description}</div>
            <div className="longitude">{data.longitude}</div>
            <div className="latitude">{data.latitude}</div>
            <div className="icons">
                <button className='edit-btn' onClick={handleOpenEditPlace}>
                    <img src={edit} alt="" />
                </button>


                <CustomModal isOpen={isEditPlaceOpen} onRequestClose={handleCloseEditPlace} contentLabel={"Edit Place"}>
                    <EditPlace placeData={data} fetchAllPlaces={fetchAllPlaces} handleCloseEditPlace={handleCloseEditPlace} handleOpenAddQuiz={handleOpenAddQuiz} fetchAllQuizzez={fetchAllQuizzez} quizzez={quizzez} handleOpenEditQuiz={handleOpenEditQuiz} />
                </CustomModal>

                <CustomModal isOpen={isAddQuizOpen} onRequestClose={handleCloseAddQuiz} contentLabel={"Add Quiz"}>
                    <AddQuiz closeAddQuizModal={handleCloseAddQuiz} placeData={data} handleOpenEditPlace={handleOpenEditPlace} />
                </CustomModal>

                <CustomModal isOpen={isOpenEditQuiz} onRequestClose={handleCloseEditQuiz} contentLabel={"Edit Quiz"}>
                    <EditQuiz quizData={selectedQuiz} placeData={data} fetchAllQuizzez={fetchAllQuizzez} fetchAllQuestions={fetchAllQuestions} questionData={questionData} handleCloseEditQuiz={handleCloseEditQuiz} setIsEditPlaceOpen={setIsEditPlaceOpen} handleOpenAddQuestion={handleOpenAddQuestion} handleOpenEditQuestion={handleOpenEditQuestion} />
                </CustomModal>

                <CustomModal
                    isOpen={isOpenAddQuestion}
                    onRequestClose={handleCloseAddquestion}
                    contentLabel={"Add Question"}
                >
                    <AddQuestion
                        quizData={selectedQuiz}
                        fetchAllQuestions={fetchAllQuestions}
                        handleCloseAddQuestion={handleCloseAddquestion}
                        handleOpenEditQuiz={handleOpenEditQuiz}
                    />
                </CustomModal>

                <CustomModal
                    isOpen={isOpenEditQuestion}
                    onRequestClose={handleCloseEditQuestion}
                    contentLabel={"Edit Question"}
                >
                    <EditQuestion
                        questionsData={selctedQuestion}
                        quizData={selectedQuiz}
                        fetchAllQuestions={fetchAllQuestions}
                        handleCloseEditQuestion={handleCloseEditQuestion}
                    />
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

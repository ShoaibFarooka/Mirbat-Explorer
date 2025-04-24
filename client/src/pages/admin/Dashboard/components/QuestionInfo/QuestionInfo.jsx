import React, { useState } from 'react'
import './QuestionInfo.css'
import edit from '../../../../../assets/icons/edit.png';
import del from '../../../../../assets/icons/del.png';
import questionService from '../../../../../services/questionService';
import { message, Popconfirm } from 'antd';
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import Editquestion from '../EditQuestion/EditQuestion';


const QuestionInfo = ({ questionsData, quizData, fetchAllQuestions }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenEditQuestion = () => {
        setIsOpen(true);
    }

    const handleCloseEditQuestion = () => {
        setIsOpen(false);
    }

    const handelDeleteQuestion = async (quizid, questionid) => {
        try {
            const response = await questionService.deleteQuestion(quizid, questionid);
            console.log("response", response);
            message.success("Question deleted successfully!");
            fetchAllQuestions()
        } catch (error) {
            console.log("error", error);
            message.error("Failed to delete quiz!");
        }
    }


    return (
        <div className='editquestion'>
            <div className="question-placeholder">{questionsData.questionText}</div>
            <div className="question-edit-icons">
                <button className='question-edit-btn' onClick={handleOpenEditQuestion}>
                    <img src={edit} alt="" />
                </button>

                <CustomModal
                    isOpen={isOpen}
                    onRequestClose={handleCloseEditQuestion}
                    contentLabel={"Edit Question"}
                >
                    <Editquestion
                        questionsData={questionsData}
                        quizData={quizData}
                        fetchAllQuestions={fetchAllQuestions}
                        closeEditquestion={handleCloseEditQuestion} />
                </CustomModal>

                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => handelDeleteQuestion(quizData._id, questionsData._id)}
                    onCancel={() => { }}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className='question-delete-btn'>
                        <img src={del} alt="delete" />
                    </button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default QuestionInfo;

import React from 'react';
import './Quizzes.css';
import Quiz from '../../../../../assets/images/Quiz.png';

const Quizzes = () => {
  return (
    <section className='quiz'>

      <div className='heading'>Quizzes</div>

      <div className='content'>

        <img src={Quiz} alt="Quiz-image" className='img' />

        <div className='paragraph'>Test your knowledge of Mirbat’s rich history with our interactive quizzes! Explore fascinating landmarks, challenge yourself with engaging questions, and uncover hidden stories from the past. Whether you're a history enthusiast or just curious, there's a quiz for everyone!
        </div>
      </div>
    </section>
  )
}

export default Quizzes;

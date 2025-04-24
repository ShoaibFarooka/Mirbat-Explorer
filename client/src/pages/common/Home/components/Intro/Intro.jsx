import React from 'react'
import intro from '../../../../../assets/images/intro.png'
import './Intro.css';

const Intro = () => {
  return (
    <div className='intro'>
      <img src={intro} alt="Intro-Image" className='intro-img' />

      <div className='intro-content'>
        <div className='heading'>What is Mirbat Explorer?</div>
        <div className='paragraph'>Mirbat Explorer is an interactive quiz-based platform for history enthusiasts, students, and travelers. Our mission is to make learning about Mirbat’s historical landmarks engaging and fun! Through interactive quizzes and fascinating insights, we bring history to
          life—challenging your knowledge while deepening your appreciation for Mirbat’s rich heritage.</div>
      </div>
    </div>
  )
}

export default Intro;

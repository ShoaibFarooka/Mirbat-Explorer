import React from 'react'
import del from '../../../../../assets/icons/del.png';
import edit from '../../../../../assets/icons/edit.png';
import './placeinfo.css'
const Placeinfo = () => {
    return (
        <div className='places-info'>
            <div className="placeholder">place holder</div>
            <div className="placeholder">place holder</div>
            <div className="placeholder">place holder</div>
            <div className="placeholder">place holder</div>
            <div className="icons">
                <button className='edit-btn'>
                    <img src={edit} alt="" />
                </button>
                <button className='delete-btn'>
                    <img src={del} alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default Placeinfo

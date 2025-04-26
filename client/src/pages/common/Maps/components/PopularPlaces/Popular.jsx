import React from 'react'
import './Popular.css'
import { Link } from 'react-router-dom'

const Popular = ({ data }) => {
    const { path, title } = data;

    const getImageUrl = (imageName) => {
        return new URL(`../../../../../assets/images/${imageName}`, import.meta.url).href;
    };

    return (
        <div className='popular'>
            <img src={getImageUrl(path)} alt="image" className='img' />
            <div className='sub-heading'>{title}</div>
        </div>
    )
}

export default Popular;

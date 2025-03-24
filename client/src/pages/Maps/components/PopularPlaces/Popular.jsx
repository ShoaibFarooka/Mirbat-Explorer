import React from 'react'
import './Popular.css'
import { Link } from 'react-router-dom'

const Popular = ({ data }) => {
    const { path, title, show } = data;

    const getImageUrl = (imageName) => {
        console.log("Image Name: ", imageName);
        return new URL(`../../../../assets/images/${imageName}`, import.meta.url).href;
    };

    return (
        <div className='popular'>
            <img src={getImageUrl(path)} alt="image" className='img' />
            <div className='sub-heading'>{title}</div>
            <Link className='paragraph'>{show}</Link>
        </div>
    )
}

export default Popular

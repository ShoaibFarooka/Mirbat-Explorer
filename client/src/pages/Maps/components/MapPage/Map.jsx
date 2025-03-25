import React, { useState } from 'react'
import './Map.css'
import Popular from '../PopularPlaces/Popular'
import LeafletMap from '../LeafletMap/LeafletMap'
import places from '../../../../data/places.json'
import Quiz from '../Quiz/Quiz'
import CustomModal from '../../../../components/CustomModal/CustomModal'
const Map = () => {
    const [isOpen, setisOpen] = useState(false);

    const openModal = () => {
        setisOpen(true);
    }

    const onRequestClose = () => {
        setisOpen(false);
    }
    return (
        <section className='Map'>
            <div className='heading'>Maps</div>
            <div className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

            <LeafletMap openModal={openModal} />
            <CustomModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={"Quiz"}>
                <Quiz />
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

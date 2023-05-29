import React from 'react'
import CardItem from "./CardItem.jsx"
import info from './Info.js'
import './Cards.scss'
function Cards() {
    return (
        <div className='cards'>
            <h1>Our Team</h1>
            <div className='cards_container'>
                <ul className='card_wrapper'>
                    <CardItem
                        img={info[0].img}
                        name={info[0].name}
                        info={info[0].info}
                        linkedIn={info[0].linkedIn}
                        github={info[0].github}
                        gmail={info[0].gmail}
                    />
                </ul>
                <ul className='card_wrapper'>
                    <CardItem
                        img={info[1].img}
                        name={info[1].name}
                        info={info[1].info}
                        linkedIn={info[1].linkedIn}
                        github={info[1].github}
                        gmail={info[1].gmail}
                    />
                    <CardItem
                        img={info[2].img}
                        name={info[2].name}
                        info={info[2].info}
                        linkedIn={info[2].linkedIn}
                        github={info[2].github}
                        gmail={info[2].gmail}
                       />
                    <CardItem
                        img={info[3].img}
                        name={info[3].name}
                        info={info[3].info}
                        linkedIn={info[3].linkedIn}
                        github={info[3].github}
                        gmail={info[3].gmail}
                    />
                    <CardItem
                        img={info[4].img}
                        name={info[4].name}
                        info={info[4].info}
                        linkedIn={info[4].linkedIn}
                        github={info[4].github}
                        gmail={info[4].gmail}
                    />
                </ul>
                <ul className='card_wrapper'>
                    <CardItem
                        img={info[5].img}
                        name={info[5].name}
                        info={info[5].info}
                        linkedIn={info[5].linkedIn}
                        github={info[5].github}
                        gmail={info[5].gmail}
                    />
                    <CardItem
                        img={info[6].img}
                        name={info[6].name}
                        info={info[6].info}
                        linkedIn={info[6].linkedIn}
                        github={info[6].github}
                        gmail={info[6].gmail}
                    />
                    <CardItem
                        img={info[7].img}
                        name={info[7].name}
                        info={info[7].info}
                        linkedIn={info[7].linkedIn}
                        github={info[7].github}
                        gmail={info[7].gmail}
                    />
                </ul>
            </div>
        </div>
    )
}

export default Cards
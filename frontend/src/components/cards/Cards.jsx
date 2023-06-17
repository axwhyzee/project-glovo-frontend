import React from 'react'
import CardItem from "./CardItem.jsx"
import team from '../../team.js'
import './Cards.scss'

function Cards() {
    return (
        <div className='cards'>
            <h2 className='about-page-header'>Our Team</h2>
            <div className='cards_container'>
                {Object.entries(team).map(([role, persons]) => (
                    <ul className='card_wrapper'>
                        {persons.map((person, i) => (
                            <CardItem 
                                key={i}
                                img={person.img}
                                name={person.name}
                                role={role}
                                desc={person.desc}
                                linkedIn={person.linkedIn}
                                github={person.github}
                                email={person.email}

                            />
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default Cards
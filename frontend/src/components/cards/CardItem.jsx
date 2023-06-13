import React, { useState } from 'react';
import "./CardItem.scss"

function CardItem({img, name, role, desc, linkedIn, github, email}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = (event) => {
        // If click on link, don't flip
        if (event.target.tagName.toLowerCase() === 'a' || event.target.tagName.toLowerCase() === 'i') return
    
        setIsFlipped(!isFlipped);
    };
    return (
    <>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <div
            className={`card ${isFlipped ? 'flipped' : ''}`}
            onClick={handleClick}
        >
            <div className="card-inner">
                <div className="card-face card-front">
                    <li className='card_item'>
                        <div className="wrapper">
                            <div className="img-area">
                                <div className="inner-area">
                                <img
                                    src={img}
                                    alt=""
                                />
                                </div>
                            </div>
                            <div className="name">{name}</div>
                            <div className="role">{role}</div>
                            <div className="social-icons">
                                <a href={linkedIn} className="linkedin">
                                <i className="fab fa-linkedin-in" />
                                </a>
                                {/* onClick={(event) => event.stopPropagation()} */}
                                <a href={github} className="github">
                                <i className="fab fa-github" />
                                </a>
                                <a href={email} className="email">
                                <i className="fa fa-envelope" />
                                </a>
                            </div>
                        </div>
                    </li>
                </div>

                
                
                <div className="card-face card-back">
                    <li className='card_item'>
                        <div className="wrapper">
                            <div className="backInfo">
                                <p>{desc}</p>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    
    </>

  )
}

export default CardItem
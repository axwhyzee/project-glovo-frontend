import React, { useState } from 'react';
import "./CardItem.scss"

function CardItem(props) {
    const [isFlipped, setIsFlipped] = useState(false);

    // const handleClick = () => {
    //     setIsFlipped(!isFlipped);
    // };
    const handleClick = (event) => {
        // Check if the click occurred on a link element
        if (event.target.tagName.toLowerCase() === 'a' && !isFlipped) {
          return; // Skip flipping the card
        }
    
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
                                    src={props.img}
                                    alt=""
                                />
                                </div>
                            </div>
                            <div className="name">{props.name}</div>
                            <div className="about">{props.info}</div>
                            <div className="social-icons">
                                <a href={props.linkedIn} className="fb">
                                <i className="fab fa-linkedin-in" />
                                </a>
                                {/* onClick={(event) => event.stopPropagation()} */}
                                <a href={props.github} className="twitter">
                                <i className="fab fa-github" />
                                </a>
                                <a href={props.gmail} className="insta">
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
                                <p>{props.backInfo}</p>
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
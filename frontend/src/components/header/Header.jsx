import React from 'react'
import './Header.scss'

function Header() {
    return (
        <div className="header-container">
            <video src="https://media.istockphoto.com/id/1366783063/video/white-corporate-abstract-background.mp4?s=mp4-640x640-is&k=20&c=wogcEMoIb2uCaafJl7Sk8DvC_FRj00b0CZ-XqprMK4g=" autoPlay loop muted/>
            <div className="overlay"></div>
            <div className="description">
                <h1>Who are we?</h1>
                <p>Some description bla bla bla bla bla bla</p>
            </div>
        </div>
    )
}

export default Header
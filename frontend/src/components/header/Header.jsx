import React from 'react'
import vid from '../../assets/header.mp4';
import './Header.scss'

function Header() {
    return (
        <div className="header-container">
            <video src={vid} autoPlay loop muted/>
            <div className="description">
                <h1>Who are we?</h1>
                <p>Some description bla bla bla bla bla bla</p>
            </div>
        </div>
    )
}

export default Header
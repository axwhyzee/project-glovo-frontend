import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Cards from '../../components/cards/Cards'
import "./about.scss"

function About() {
  return (
    <div className='about-page'>
        <Navbar />
        <Header />
        <Cards />
    </div>
  )
}

export default About
import React from 'react'
import Header from '../../components/header/Header'
import Cards from '../../components/cards/Cards'
import "./about.scss"

function About() {
  return (
    <div className='about-page'>
        <Header />
        <Cards />
    </div>
  )
}

export default About
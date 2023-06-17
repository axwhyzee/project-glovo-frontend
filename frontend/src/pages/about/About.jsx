import React, {useEffect, useState} from 'react'
import Header from '../../components/header/Header'
import Cards from '../../components/cards/Cards'
import systemDesign from '../../assets/system-design.png';
import "./about.scss"

function About() {
  const [navOpaque, setNavOpaque] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', ()=>{
      setNavOpaque(window.scrollY == 0 ? false : true);
    })
  }, []);

  return (
    <div className='about-page'>
        <div className={'navbar-bg' + (navOpaque ? ' navbar-bg-styles' : '')} />
        <section className='about-section'>
          <Header />
        </section>
        <section className='about-section'>
          <Cards />
        </section>
        <section className='about-section'>
          <h1 className='system-design-header'>
            System Design
          </h1>
          <div className='system-design-img-wrapper'>
            <img src={systemDesign} className='system-design-img'/>
          </div>
        </section>
    </div>
  )
}

export default About
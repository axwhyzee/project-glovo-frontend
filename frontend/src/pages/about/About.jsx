import React from 'react'
import "./about.scss"
import Navbar from '../../components/Navbar'
function About() {
  return (
    <>
    <Navbar></Navbar>
    <header>
        <div class="title">
            <h3>The creative crew</h3>
        </div>
        <div class="content">
            <h5>who we are</h5>
            <p>We are team of creatively diverse. driven. innovative individuals working in various locations from the world.</p>
        </div>
    </header>

    <main>
        <div class="profile">
                <figure data-value="product owner">
                    <img src="https://rvs-team-page.onrender.com/photo1.png" alt=""/>
                    <figcaption>bill mahoney</figcaption>
                </figure>
            </div>

            <div class="profile">
                <figure data-value="art director">
                    <img src="https://rvs-team-page.onrender.com/photo2.png" alt=""/>
                    <figcaption>saba cabrera</figcaption>
                </figure>
            </div>

            <div class="profile">
                <figure data-value="tech lead">
                    <img src="https://rvs-team-page.onrender.com/photo3.png" alt=""/>
                    <figcaption>shae le</figcaption>
                </figure>
            </div>

            <div class="profile">
                <figure data-value="ux designer">
                    <img src="https://rvs-team-page.onrender.com/photo4.png" alt=""/>
                    <figcaption>skylah lu</figcaption>
                </figure>
            </div>

            <div class="profile">
                <figure data-value="developer">
                    <img src="https://rvs-team-page.onrender.com/photo5.png" alt=""/>
                    <figcaption>griff richards</figcaption>
                </figure>
            </div>

            <div class="profile">
                <figure data-value="developer">
                    <img src="https://rvs-team-page.onrender.com/photo6.png" alt=""/>
                    <figcaption>stan john</figcaption>
                </figure>
            </div>
            </main>



    </>
  )
}

export default About
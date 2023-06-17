import React from 'react'
import backgroundImage from '../../assets/about-page-background.jpg';
import './Header.scss'

function Header() {
    return (
        <div className="header-container">
            <img src={backgroundImage} className="header-image" />
            
            <div className="description">
                <section className="column">
                    <h1>Streamlining the consumption of global news</h1>
                </section>
                <hr></hr>
                <section className="column">
                    <p className="text-sm">
                        Every 12 hours, news articles are gathered from various reputable news sources. We then leverage on advanced NLP algorithms to identify key concepts, entities, and themes of each article. 
                        This extraction process helps users quickly understand the essence of the news without having to read each article in its entirety. To further facilitate information digestion, extracted keywords and articles are represented in a visually appealing graph format. Information is organized in a structured manner, making it easy for users to navigate through different topics and understand the relationships between articles to grasp the broader context of news events and explore related articles effortlessly. 
                    </p>
                    <br/>
                    <p className="text-sm">
                        Overall, Project Glovo revolutionizes the way news information is consumed. By automating the collection, processing, and visualization of news articles, it empowers users to stay informed about global events efficiently. Whether for research, staying updated on current affairs, or simply exploring diverse perspectives, Project Glovo offers a user-friendly and visually appealing tool for simplified news ingestion.
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Header
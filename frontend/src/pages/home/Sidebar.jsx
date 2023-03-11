import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import './home.scss';
import Box from '@mui/material/Box';
import IndivPost from '../../components/IndivPost';


function Sidebar() {
    const [toggle, SetToggle] = useState(true);
    const [posts, setPosts] = useState(null)

    // we only need to render this once, so the dependency array is empty
    useEffect(() => {
    //this will return some promise data
        getAllPosts()
        console.log(posts)
    }, [])

    //this is the root URL
    const API_URL = "https://project-glovo-api.onrender.com/news/"; //note that the news URL
    
    //Get all posts
    const getAllPosts = async () => {
        const response = await fetch(API_URL, {
          method: "GET",
        });
        const data = await response.json();
        setPosts(data);
      };

    if(!posts){
        return null
    }

    return (
        <section className={'sidebar' + (toggle ? ' expanded' : '')}>
            <button className='toggle-sidebar' type='button' onClick={() => { SetToggle(!toggle) }}>
                <FontAwesomeIcon icon={toggle ? faCaretRight : faCaretLeft} />
            </button>
            <Box 
                display="flex" 
                flexDirection={'column'} 
                padding ={3} 
                justifyContent="center" 
                alignItems={"center"}
                > 
                {posts && 
                    posts.map((item, index) => (
                    <IndivPost 
                        date={new Date(`${item.date}`).toLocaleDateString()} 
                        description = {item.description}
                        keywords = {item.keywords}
                        // id = {item._id}
                        publisher = {item.publisher}
                        title = {item.title}
                        // key={index} 
                        url = {item.url}
                    /> 
                ))}
            </Box>
        </section>
    )
}

export default Sidebar;
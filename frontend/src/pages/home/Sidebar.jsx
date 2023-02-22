import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import { getAllPosts } from '../../features/posts/postService'
import Box from '@mui/material/Box';
import './home.scss';
import IndivPost from '../../components/IndivPost';

function Sidebar() {
    const [toggle, SetToggle] = useState(true);
    //*After getting the data, we need to store the data in the useState
    const [posts, setPosts] = useState()

        // we only need to render this once, so the dependency array is empty
    useEffect(() => {
        //this will return some promise data
        getAllPosts()
            .then((data) => setPosts(data?.posts)) //FROM here, now we have the array of the post
            .catch(err => console.log(err))
        }, [])

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
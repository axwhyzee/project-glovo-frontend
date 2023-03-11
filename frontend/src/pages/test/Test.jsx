import React from 'react'
import { useState , useEffect} from 'react'
import Box from '@mui/material/Box';
import IndivPost from '../../components/IndivPost';
function Test() {
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
        <Box 
        display="flex" 
        flexDirection={'column'} 
        padding ={4} 
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
                url = {item.URL}
            /> 
        ))}
    </Box>
  )
}

export default Test
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import {Search} from  "@mui/icons-material"
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import IndivPost from '../../components/IndivPost';
import './home.scss';
//this is the root URL
const API_URL = "https://project-glovo-api.onrender.com/news/"; //note that the news URL

function Sidebar(toggleGlobal) {
    const [toggle, SetToggle] = useState(toggleGlobal);
    const [posts, setPosts] = useState(null)
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    // we only need to render this once, so the dependency array is empty
    useEffect(() => {
    //this will return some promise data
        getAllPosts()
        console.log(posts)
    }, [posts])

    
    //Get all posts
    const getAllPosts = async () => {
        const response = await fetch(API_URL, {
          method: "GET",
        });
        const data = await response.json();
        setPosts(data);
      };

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
            if (searchInput.length > 0) {
                posts.filter((post) => {
                return post.publisher.match(searchInput);
            });
        };
    }
    
    //mount the thing
    if(!posts){
        return null
    }

    //for the pagination (From chatGPT)
    const itemsPerPage  = 10;
    const totalItems = posts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    function handleClickPagination(pageNumber) {
        setCurrentPage(pageNumber);
      }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = posts.slice(startIndex, endIndex);

    return (
        <section className={'sidebar' + (toggle ? ' expanded' : '')}>
            <button className='toggle-sidebar' type='button' onClick={() => { SetToggle(!toggle) }}>
                <FontAwesomeIcon icon={toggle ? faCaretRight : faCaretLeft} />
            </button>


            {toggle ? 
                <Box 
                display="flex" 
                flexDirection={'column'} 
                padding ={2} 
                justifyContent="center" 
                alignItems={"center"}
                gap = {2}
                > 
                <Box
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..."
                        sx={{
                        backgroundColor: "white",
                        borderRadius: "4rem",
                        padding: "auto",
                        margin: "auto"
                        }}
                        type="text"
                        onChange={handleChange}
                        value={searchInput}
                    />
                    <IconButton >
                        <Search />
                    </IconButton>
                </Box>

            
                {itemsToShow && 
                    itemsToShow.map((item, index) => (
                    <IndivPost 
                        date={new Date(`${item.date}`).toLocaleDateString()} 
                        description = {item.description}
                        keywords = {item.keys}
                        id = {item._id}
                        publisher = {item.publisher}
                        title = {item.title}
                        key={index} 
                        url = {item.URL}
                    /> 
                ))}
                <div className="pagination-container">
                    {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleClickPagination(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                    ))}
                </div>
            </Box> : ""}
        </section>
    )
}

export default Sidebar;
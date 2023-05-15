import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import IndivPost from '../../components/IndivPost';
import './home.scss';

function Sidebar({ data: posts, isSideBarOpen, setIsSideBarOpen }) {
    //define the useState
    const [searchPosts, setsearchPosts] = useState({articles: ""})
    const [searchInput, setSearchInput] = useState("");
    const [ready, setReady] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);

    const API_ENDPOINT = 'https://project-glovo-api.onrender.com/news';
    // const request_body = {
    //     key: 'ai',
    //     page: 1,
    //   };


    //for the pagination (From chatGPT)
    // const itemsPerPage  = 10;
    // const totalItems = posts.length;
    // const totalPages = Math.ceil(totalItems / itemsPerPage);
    // function handleClickPagination(pageNumber) {
    //     setCurrentPage(pageNumber);
    //   }
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const itemsToShow = posts.slice(startIndex, endIndex);
    
    // const getAllPosts = async () => {
    //     try {
    //       //const response = await fetch(`${API_ENDPOINT}?key=${request_body.key}&page=${request_body.page}`);
    //       if(!searchPosts){
    //         const response = await fetch(`${API_ENDPOINT}`);
    //         const data = await response.json();
    //         setsearchPosts(data);
    //       } else{

    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    // };

    const handleKeyDown = async (e) => {
        // e.preventDefault();
        
        if (e.key === 'Enter'){
            setReady(true);
            const requestBody =  searchInput
            //this is damn weird
            console.log(`${API_ENDPOINT}?key=${requestBody}&page=1`);
            const response = await fetch(`${API_ENDPOINT}?keys=${requestBody}&page=1`, {
                method: "GET"
            });
            const responseData = await response.json();
            setsearchPosts(responseData);
        }
    }
    // we only need to render this once, so the dependency array is empty
    // useEffect(() => {
    //     //this will return some promise data
    //     getAllPosts();
    // }, [])
    console.log(posts)
    console.log(searchPosts)
    // mount the thing
    if(!posts){
        return null
    }

    return (
        <section className={`sidebar ${isSideBarOpen ? 'expanded' : ''}`}>
            <button className='toggle-sidebar' type='button' onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                <FontAwesomeIcon icon={isSideBarOpen ? faCaretRight : faCaretLeft} />
            </button>

            
            {isSideBarOpen ? 
                <>
                <Box
                    width="100%"
                    gap="3rem"
                    padding="2px 20px"
                    position="absolute"
                    top="10px"
                    margin='0px 30px'
                >
                    <InputBase placeholder="Search..."
                        sx={{
                        backgroundColor: "white",
                        padding: "2px 2px",
                        margin: "auto"
                        }}
                        type="text"
                        onChange={(e) => setSearchInput(e.target.value)}
                        value={searchInput}
                        onKeyDown={handleKeyDown}
                    >
                    </InputBase>

                </Box>

                <div className='sidebar-content'>
                    <Box 
                    display="flex" 
                    flexDirection={'column'} 
                    paddingLeft={2}
                    paddingRight={2}
                    justifyContent="center" 
                    alignItems={"center"}
                    gap = {2}
                    > 
                        {posts.articles && !ready &&
                            posts.articles.map((item, index) => (
                            <IndivPost 
                                date={new Date(`${item.date}`).toLocaleDateString()} 
                                description = {item.description}
                                keywords = {item.keys}
                                id = {item._id}
                                publisher = {item.publisher}
                                title = {item.title}
                                key={index} 
                                url = {item.url}
                            /> 
                        ))}
                        {searchPosts.articles && ready &&
                            searchPosts.articles.map((item, index) => (
                            <IndivPost 
                                date={new Date(`${item.date}`).toLocaleDateString()} 
                                description = {item.description}
                                keywords = {item.keys}
                                id = {item._id}
                                publisher = {item.publisher}
                                title = {item.title}
                                key={index} 
                                url = {item.url}
                            /> 
                        ))}
                        {/* <div className="pagination-container">
                            {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleClickPagination(index + 1)}
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </button>
                            ))}
                        </div> */}
                    </Box> 
                </div>
            </>
            : (
                <></>
            )}
            
        </section>
    )
}

export default Sidebar;
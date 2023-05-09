import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import IndivPost from '../../components/IndivPost';
import './home.scss';

function Sidebar({data: posts, toggleGlobal, toggleCallback}) {
    //define the useState
    // const [posts, setPosts] = useState(null)
    const [searchInput, setSearchInput] = useState("");
    // const [currentPage, setCurrentPage] = useState(1);

    // console.log(searchInput)
    // const API_ENDPOINT = 'https://project-glovo-api.onrender.com/news';
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
    //       const response = await fetch(`${API_ENDPOINT}`);
    //       const data = await response.json();
    //       setPosts(data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    // };
    // we only need to render this once, so the dependency array is empty
    // useEffect(() => {
    //     //this will return some promise data
    //     getAllPosts();
    // }, [])
    // console.log(posts)
    //mount the thing
    // if(!posts){
    //     return null
    // }

    console.log("Posts", posts);
    return (
        <section className={'sidebar' + (toggleGlobal ? ' expanded' : '')}>
            <button className='toggle-sidebar' type='button' onClick={() => toggleCallback()}>
                <FontAwesomeIcon icon={toggleGlobal ? faCaretRight : faCaretLeft} />
            </button>

            
            {toggleGlobal ? 
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
                        {posts.articles && searchInput.length === 0 &&
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
                        {posts.articles && searchInput.length > 0 &&
                            posts.articles.filter(item => item.keys.some(value => value.includes(searchInput))).map((item, index) => (
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
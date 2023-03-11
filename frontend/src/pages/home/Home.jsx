import React from 'react';
import Sidebar from "./Sidebar";
import Graph from '../../components/Graph';
import Search from '../../components/Search';
import Zoom from '../../components/Zoom';
import Navbar from '../../components/Navbar';
function Home() {
  return (
    <div className='home'>
      <Navbar />
      <Sidebar />
      <Search />
      <Zoom />
      <Graph />
    </div>
  )
}

export default Home
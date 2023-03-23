import React from 'react';
import Sidebar from "./Sidebar";
import Graph from '../../components/Graph';
import Zoom from '../../components/Zoom';
import Navbar from '../../components/Navbar';

function Home({ graphData }) {
  return (
    <div className='home'>
      <Navbar />
      <Sidebar />
      <Zoom />
      <Graph data={graphData} />
    </div>
  )
}

export default Home
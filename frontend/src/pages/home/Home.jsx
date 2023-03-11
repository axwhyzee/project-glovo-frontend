import React from 'react';
import Sidebar from "./Sidebar";
import Graph from '../../components/Graph';
import Search from '../../components/Search';
import Zoom from '../../components/Zoom';

function Home() {
  return (
    <div className='home'>
      <Sidebar />
      <Search />
      <Zoom />
      <Graph />
    </div>
  )
}

export default Home
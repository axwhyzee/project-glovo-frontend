import React from 'react';
import Sidebar from "./Sidebar";
import Graph from '../../components/Graph';

function Home() {
  return (
    <div className='home'>
      <Sidebar />
      <Graph />
    </div>
  )
}

export default Home
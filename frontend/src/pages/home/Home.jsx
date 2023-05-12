import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Graph from '../../components/Graph';
import Zoom from '../../components/Zoom';
import Navbar from '../../components/navbar/Navbar';
import Panel, { dummy } from '../../components/graph/Panel';
import Resolver from '../../components/graph/Resolver';

function Home({ graphData, postData }) {
  const [queries, setQueries] = useState(dummy);
  const [resolved, setResolved] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div className='home'>
      <Navbar />
      <Sidebar data={postData} isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
      <Panel data={queries} update={setQueries} isSideBarOpen={isSideBarOpen}/>
      <Zoom />
      <Graph data={graphData} highlight={resolved} />
      <Resolver data={graphData} queries={queries} update={setResolved}/>
    </div>
  )
}

export default Home
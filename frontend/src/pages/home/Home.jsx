import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Graph from '../../components/Graph';
import Zoom from '../../components/Zoom';
import Navbar from '../../components/Navbar';
import Panel, { dummy } from '../../components/graph/Panel';
import Resolver from '../../components/graph/Resolver';

function Home({ graphData }) {
  const [queries, setQueries] = useState(dummy);
  const [resolved, setResolved] = useState([]);
  const [toggleGlobal, setToggleGlobal] = useState(false);

  return (
    <div className='home'>
      <Navbar />
      <Sidebar toggleGlobal={toggleGlobal} toggleCallback={() => setToggleGlobal(toggleGlobal => !toggleGlobal)}/>
      <Panel data={queries} update={setQueries} toggleGlobal={toggleGlobal}/>
      <Zoom />
      <Graph data={graphData} highlight={resolved} />
      <Resolver data={graphData} queries={queries} update={setResolved}/>
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import Graph from '../../components/Graph';
import Navbar from '../../components/navbar/Navbar';
import Panel, { dummy } from '../../components/graph/Panel';
import Resolver from '../../components/graph/Resolver';
import { getClusterByKey } from '../../network/api';
import Spinner from '../../components/Spinner';

function Home({ graphData, postData }) {
  const [queries, setQueries] = useState(dummy);
  const [resolved, setResolved] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const simulationTime = 6;
  // callback
  const selectNode = async (val) => {
    setLoading(true);
    const temp = await getClusterByKey(val);
    if (posts) setIsSideBarOpen(true);
    setPosts(temp);
    setLoading(false);
  }

  return (
    <div className='home'>
      <Sidebar posts={posts} isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} selectNode={selectNode}/>
      <Panel data={queries} update={setQueries} isSideBarOpen={isSideBarOpen} simulationTime={simulationTime}/>
      <Graph data={graphData} selectNode={selectNode} highlight={resolved} cola_engine={false} simulationTime={simulationTime} setLoading={setLoading}/>
      <Resolver data={graphData} queries={queries} update={setResolved}/>
      {loading && <Spinner />}
    </div>
  )
}

export default Home
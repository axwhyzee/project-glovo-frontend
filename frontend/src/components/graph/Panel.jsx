import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import SearchBox from "./Search";

const colorizer = d3.scaleOrdinal().range(d3.schemeTableau10);


function Query({ query, color, popQuery }) {
    return (
        <li onClick={()=>popQuery(query)}>
            <button className="indicator" title={query} style={{ backgroundColor: color }}></button>{query}
        </li>
    )
}

function Panel({ data = [], update, isSideBarOpen, simulationTime }) {
    const [countdown, setCountdown] = useState(simulationTime);
    const append = (v) => {
        const q = v.trim().toLowerCase();
        if (q.length === 0) return;
        const s = new Set(data.map(p => p.query));
        if (!s.has(q)) update([...data, { query: q, color: colorizer(q) }]);
    };

    const popQuery = (v) => {
        const tempData = [...data];
        for (let i=0; i<data.length; i++) {
            if (data[i]['query'] === v) {
                tempData.splice(i, 1);
                break;
            }
        }
        update(tempData);
    }

    useEffect(() => {
        const simulationCountdown = setInterval(() => {
            setCountdown(prev => prev-1);
        }, 1000);

        setTimeout(() => {
            if (simulationCountdown) clearInterval(simulationCountdown);
        }, simulationTime * 1000)

        return () => {if (simulationCountdown) clearInterval(simulationCountdown)};
    }, [])

    return (
        
        <section className={`graph-query ${isSideBarOpen ? 'pushed' : ''}`}>
            {countdown <= 0 ? (
                <SearchBox update={append} />
            ) : (
                <div className='still-simulating-text'>Simulation in progress ({countdown}s) ...</div>
            )}
            <ul>
                {data.map(q => <Query key={q.query} {...q} popQuery={popQuery} />)}
            </ul>
        </section>
    )
}

export default Panel;
export const dummy = [];
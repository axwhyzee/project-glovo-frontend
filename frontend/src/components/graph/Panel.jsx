import React from "react";
import * as d3 from "d3";
import SearchBox from "./Search";

const colorizer = d3.scaleOrdinal().range(d3.schemeTableau10);
const data = [
    { query: "singapore", color: colorizer("singapore") },
    { query: "google", color: colorizer("google") },
    { query: "lee", color: colorizer("lee") },
]

function Query({ query, color }) {
    return (
        <li>
            <button className="indicator" title={query} style={{ backgroundColor: color }}></button>{query}
        </li>
    )
}

function Panel({ data = [], update, isSideBarOpen }) {
    const append = (v) => {
        const q = v.trim().toLowerCase();
        if (q.length === 0) return;
        const s = new Set(data.map(p => p.query));
        if (!s.has(q)) update([...data, { query: q, color: colorizer(q) }]);
    };

    return (
        <section className={`graph-query ${isSideBarOpen ? 'pushed' : ''}`}>
            <SearchBox update={append} />
            <ul>
                {data.map(q => <Query key={q.query} {...q} />)}
            </ul>
        </section>
    )
}

export default Panel;
export const dummy = data;
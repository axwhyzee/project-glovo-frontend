import React from "react";
import * as d3 from "d3";
import SearchBox from "./Search";
import _ from "lodash";

const colorizer = d3.scaleOrdinal().range(d3.schemeTableau10);
const data = [
    { query: "eta", color: colorizer("eta") }
]

function Query({ query, color }) {
    return (
        <li>
            <button className="indicator" title={query} style={{ backgroundColor: color }}></button>{query}
        </li>
    )
}

function Panel({ data = [], update }) {
    const append = (v) => {
        const q = v.toLowerCase()
        const s = new Set(data.map(p => p.query));
        if (!s.has(q)) update([...data, { query: q, color: colorizer(q) }]);
    };

    return (
        <section className="graph-query">
            <SearchBox update={append} />
            <ul>
                {data.map(q => <Query key={q.query} {...q} />)}
            </ul>
        </section>
    )
}

export default Panel;
export const dummy = data;
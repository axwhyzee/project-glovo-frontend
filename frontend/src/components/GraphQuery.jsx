import React from "react";

const data = [
    { query: "eta", color: d3.scaleOrdinal().range(d3.schemeCategory10)("eta") }
]

function GraphQuery() {
    return (
        <section className="graph-query">
            <ul>
                <li><button className="indicator"></button> Query1</li>
                <li><button className="indicator"></button> Query1</li>
            </ul>
        </section>
    )
}

export default GraphQuery;
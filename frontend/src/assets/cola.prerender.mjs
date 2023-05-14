import _ from "lodash";
import * as d3 from 'd3';
import * as cola from "webcola";
import { getEdgesWithIds } from "../network/api.mjs";
import { setTimeout } from 'timers/promises';

const RADIUS = 10;

const simulate = (nodes, edges) => {
    return cola.d3adaptor(d3)
        .nodes(nodes)
        .links(edges)
        .jaccardLinkLengths(edges.length / 8, 0.7)
        .avoidOverlaps(true)
        .handleDisconnected(true)
        .start(30);
};

async function main({ timeout = 120000 } = {}) {
    const transform = ({ nodes, edges }) => {
        // only necessary for cola to compute bounding boxes
        const nodes2 = _.chain(nodes)
            .map(p => ({...p, width: RADIUS * p.name.length, height: RADIUS * 2.5}))
            .value()
    
        return { nodes: nodes2, edges };
    };

    const exportNodes = (nodes) => {
        return _.chain(nodes)
            .map(x => _.pick(x, ['i', 'name', 'x', 'y']))
            .thru(x => JSON.stringify(x, undefined, 2))
            .value();
    };

    const {nodes, edges} = transform(await getEdgesWithIds());
    const simulation = simulate(nodes, edges);
    const fn = await setTimeout(timeout, () => {
        simulation.stop();
        return exportNodes(nodes);
    });
    const final = fn(); // unfortunately the timer promises api does not take a callback so we execute it ourselves once it expires
    console.log(final);
    return final;
};

await main();

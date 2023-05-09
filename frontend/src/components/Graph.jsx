import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/useD3';
import useWindowSize from 'use-window-size-v2';
import _ from "lodash";

const RADIUS = 10;

const renderNode = svg => {
    const node = svg.append("g")
        .classed("node", true)
        .attr("key", (d) => d.i)

    const circle = node
        .append("circle")
        .classed("point", true);

    const lower = node
        .append("text")
        .classed("lower", true)
        .attr("dy", RADIUS / 2)
    //.text((d) => d.i);

    const name = node
        .append("text")
        .classed("name", true)
        .attr("dy", 15)
        .text((d) => d.name);
};

function renderNodes() {
    const node = this.svg
        .select(".root")
        .selectAll("g.node")
        .data(this.data.nodes, (d) => d.i)
        .join(
            enter => renderNode(enter),
            update => update,
            exit => exit.remove()
        );
};

function renderEdges() {
    this.link = this.svg
        .select(".root")
        .selectAll("line.edge")
        .data(this.data.edges, (d) => d.i)
        .join("line")
        .classed("edge", true)
        .attr("stroke-opacity", (d) => this.linkOpacity(d.w));
}

/**
 * Builds an adjacency list
 * @param {*} nodes 
 * @param {*} edges 
 * @returns Adjacency List (sparse)
 */
const computeFocus = (nodes, edges) => {
    const mapping = _.chain(nodes)
        .map("i")
        .map(i => [i, {i, maxw: 0, edges: new Set(), neighbours: new Set()}])
        .fromPairs()
        .value();
    
    for (const {i, s, t} of edges) {
        mapping[s].edges.add(i);
        mapping[t].edges.add(i);
        mapping[s].neighbours.add(t);
        mapping[t].neighbours.add(s);
    }
    for (const v of Object.values(mapping)) {
        v.maxw = _.chain(edges).filter(p => v.edges.has(p.i)).map("w").max().value() || 0;
    }
    return mapping;
};

function renderFocus(focusNode) {
    const { svg, linkOpacity: defaultOpacity } = this;
    const t = svg.transition().duration(75);
    
    if (!focusNode) {
        svg.selectAll("line.edge")
            .transition(t)
            .attr("stroke", "black")
            .attr("stroke-opacity", (d) => defaultOpacity(d.w))
            .attr("stroke-dasharray", null);
        svg.selectAll("g.node, circle.point.highlight").transition(t).attr("opacity", 1);
        return;
    }

    const graph = this.data.graph;
    const { maxw, edges, neighbours } = graph[focusNode.i] || { maxw: 0, edges: [], neighbours: [] };

    const interested = new Set([focusNode.i, ...neighbours]);
    const dashSpacer = d3.scaleLog().range([4, 0]).domain([1, maxw]);
    const overrideDash = (w) => `3 ${dashSpacer(w) * 2}`;
    const overrideOpacity = d3.scaleLog().range([0.2, 0.7]).domain([1, maxw]);
    
    svg.selectAll("line.edge")
        .filter((d) => edges.has(d.i))
        .transition(t)
        .attr("stroke-opacity", (d) => overrideOpacity(d.w))
        .attr("stroke-dasharray", (d) => overrideDash(d.w));
    svg.selectAll("line.edge")
        .filter((d) => !edges.has(d.i))
        .transition(t)
        .attr("stroke-opacity", 0.1);
    svg.selectAll("g.node, circle.point.highlight")
        .filter((d) => interested.has(d.i))
        .transition(t)
        .attr("opacity", 1);
    svg.selectAll("g.node, circle.point.highlight")
        .filter((d) => !interested.has(d.i))
        .transition(t)
        .attr("opacity", 0.15);
}

function enableClick() {
    this.svg.selectAll("g.node").on("click", function (evt, d) {
        console.log("Node selected", d);
        // evt.currentTarget.dispatchEvent(
        //   new CustomEvent("input", {
        //     bubbles: true
        //   })
        // );
    });
}

function enableHover() {
    const ctx = this;
    function onMouseEnter(evt) {
        let pos = d3.pointer(evt, this);
        if (ctx.transform) pos = ctx.transform.invert(pos);
        const d = ctx.quadtree.find(pos[0], pos[1], 30);
        renderFocus.bind(ctx)(d);
    }
    ctx.svg.on("pointermove", _.debounce(onMouseEnter));
};

function setupTicked() {
    this.svg.selectAll("g.node").attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    this.svg.selectAll(".highlight").attr("transform", (d) => `translate(${d.ref.x}, ${d.ref.y})`);

    this.link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

    this.quadtree = d3
        .quadtree()
        .x((d) => d.x)
        .y((d) => d.y)
        .addAll(this.data.nodes);
};

function enableZoom() {
    const handleZoom = (evt) => {
        this.transform = evt.transform;
        this.svg.select(".root").attr("transform", this.transform);
        this.svg.selectAll("g.node text.name")
            .attr("opacity", this.nameOpacity(this.transform.k));
    };

    const zoomFix = (evt) => {
        evt.preventDefault();
        return (!evt.ctrlKey || evt.type === 'wheel') && !evt.button;
    };

    const zoom = d3.zoom()
        .extent([[0, 0], [this.width, this.height]])
        .scaleExtent([0.4, 3])
        .filter(zoomFix)
        .on("zoom", handleZoom);

    zoom(this.svg);
}

function enableTooltip() {
    // Tooltip feature
    const tooltip = d3
        .select("body")
        .append("div") // the tooltip always "exists" as its own html div, even when not visible
        .attr("class", "tooltip");

    const mousemove_tooltip = (evt, d) => {
        return tooltip
            .html("<div>" + d.name + "</div>") // changed from h4 element to div because <h*> & <p> tags have natural padding top & btm
            .style("visibility", "visible")
            .style("top", (evt.pageY + 2 * RADIUS) + "px") // + radius to prevent tooltip from overlapping over the node, creating jittery effect
            .style("left", evt.pageX + "px");
    }

    const mouseleave_tooltip = () => {
        return tooltip
            .transition()
            .duration(0)
            .style("visibility", "hidden");
    }

    this.svg.selectAll("g.node").on("mousemove", mousemove_tooltip);
    this.svg.selectAll("g.node").on("mouseleave", mouseleave_tooltip);
}

function enableDrag() {
    //DRAG
    const dragstarted = (event, d) => {
        this.simulation.alphaTarget(0.3).restart();
        d.fx = event.x;
        d.fy = event.y;
    }

    const dragged = (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
    }

    const dragended = (d) => {
        // alpha min is 0, head there
        this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    //DRAG FUNCTION
    const drag = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

function enableHighlight() {
    const highlight = _.map(this.data.highlight, (h) => {
        return { ...h, ref: _.find(this.data.nodes, (q) => q.i === h.i) };
    })
    
    const node = this.svg
        .select(".root")
        .selectAll(".highlight")
        .data(highlight, (d) => d.i)
        .join(
            enter => {
                enter.append("circle")
                    .classed("point", true)
                    .classed("highlight", true)
                    .attr("key", (d) => d.i)
                    .attr("fill", d => d.color)
            },
            update => update,
            exit => exit.remove()
        );

};

function Graph({ data, highlight = [], settings = {} }) {
    const { width, height } = useWindowSize();

    const ctx = {}
    const ref = useD3((svg) => {
        console.debug(`Graph rerender`);
        // Shared state
        ctx.svg = svg;
        ctx.data = data;
        ctx.data.highlight = highlight;
        ctx.data.graph = computeFocus(ctx.data.nodes, ctx.data.edges);
        ctx.width = width;
        ctx.height = height;
        ctx.linkOpacity = d3.scaleLog().domain([1, d3.max(ctx.data.edges, (d) => d.w)]).range([0.1, 0.25]);
        ctx.nameOpacity = d3.scalePow().exponent(2).domain([0.7, 1]).range([0, 1]);
        ctx.quadtree = undefined;
        ctx.transform = null;
        // Render
        renderEdges.bind(ctx)();
        renderNodes.bind(ctx)();

        // Setup interactivity
        ctx.quadtree = d3
            .quadtree()
            .x((d) => d.x)
            .y((d) => d.y)
            .addAll(ctx.data.nodes);

        enableClick.bind(ctx)();
        enableTooltip.bind(ctx)();
        enableHover.bind(ctx)();
        enableZoom.bind(ctx)();
        enableDrag.bind(ctx)();
        enableHighlight.bind(ctx)();

        // Construct the forces.
        const forceNode = d3.forceManyBody().strength(-300);
        const forceLink = d3.forceLink(ctx.data.edges).id((node) => node.i);
        const forceCollide = d3.forceCollide().radius(RADIUS);

        ctx.simulation = d3
            .forceSimulation(ctx.data.nodes, (d) => d.i)
            .force("link", forceLink)
            .force("charge", forceNode)
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .force("collision", forceCollide)
            .on("tick", setupTicked.bind(ctx));

    }, [data, highlight]);

    return (
        <svg
            className="network-graph-style-1"
            ref={ref}
            width={width}
            height={height}
            viewBox={[[-width / 2, -height / 2, width, height]]}>
            <g className="root"></g>
        </svg>
    );
}

export default Graph;
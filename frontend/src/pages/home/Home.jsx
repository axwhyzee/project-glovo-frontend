import React from 'react'
import d3 from 'd3'
import Sidebar from "./Sidebar";
import _ from "lodash";

function Home() {
  return (
    <div className='home'>
      <Sidebar />
    </div>
  )
}

/*function Graph() {
  const nodes = [
    { i: 0, upper: "Α", lower: "α", name: "Alpha", en: "a" },
    { i: 1, upper: "Β", lower: "β", name: "Beta", en: "b" },
    { i: 2, upper: "Γ", lower: "γ", name: "Gamma", en: "g" },
    { i: 3, upper: "Δ", lower: "δ", name: "Delta", en: "d" },
    { i: 4, upper: "Ε", lower: "ε", name: "Epsilon", en: "e" },
    { i: 5, upper: "Ζ", lower: "ζ", name: "Zeta", en: "z" },
    { i: 6, upper: "Η", lower: "η", name: "Eta", en: "h" },
    { i: 7, upper: "Θ", lower: "θ", name: "Theta", en: "th" },
    { i: 8, upper: "Ι", lower: "ι", name: "Iota", en: "i" },
    { i: 9, upper: "Κ", lower: "κ", name: "Kappa", en: "k" },
    { i: 10, upper: "Λ", lower: "λ", name: "Lambda", en: "l" },
    { i: 11, upper: "Μ", lower: "μ", name: "Mu", en: "m" },
    { i: 12, upper: "Ν", lower: "ν", name: "Nu", en: "n" },
    { i: 13, upper: "Ξ", lower: "ξ", name: "Xi", en: "x" },
    { i: 14, upper: "Ο", lower: "ο", name: "Omicron", en: "o" },
    { i: 15, upper: "Π", lower: "π", name: "Pi", en: "p" },
    { i: 16, upper: "Ρ", lower: "ρ", name: "Rho", en: "r" },
    { i: 17, upper: "Σ", lower: "σ", name: "Sigma", en: "s" },
    { i: 18, upper: "Τ", lower: "τ", name: "Tau", en: "t" },
    { i: 19, upper: "Υ", lower: "υ", name: "Upsilon", en: "u" },
    { i: 20, upper: "Φ", lower: "φ", name: "Phi", en: "ph" },
    { i: 21, upper: "Χ", lower: "χ", name: "Chi", en: "ch" },
    { i: 22, upper: "Ψ", lower: "ψ", name: "Psi", en: "ps" },
    { i: 23, upper: "Ω", lower: "ω", name: "Omega", en: "o" }
  ]
  const edges = ((nodes, n = Math.trunc(nodes.length * 1.5)) => {
    const sampleSpace = Array.from(
      { length: nodes.length - 1 },
      (_, i) => nodes.length - i - 1
    ).flatMap((n, i) => Array.from({ length: n }, (_, x) => [i, i + x + 1]));
  
    return _.sampleSize(sampleSpace, n).map(([x, y], i) => ({
      i,
      s: x,
      t: y,
      w: Math.trunc(Math.random() * 10 + 1)
    }));
  })(nodes).map((d) => ({ ...d, source: d.s, target: d.t }))

  const width = 1080;
      const height = 600;
      const radius = 10;
    
      // Construct the scales.
      const weightScale = () =>
        d3.scaleLog().domain([1, d3.max(edges, (d) => d.w)]);
    
      const linkDistance = weightScale().range([500, 30]);
      const linkStrength = weightScale().range([0.2, 0.5]);
      const linkOpacity = weightScale().range([0.1, 0.25]);
      const linkColor = d3
        .scaleDivergingLog()
        .domain([
          1,
          d3.mean(edges, (d) => d.w) - 1 * d3.deviation(edges, (d) => d.w),
          d3.max(edges, (d) => d.w)
        ])
        .interpolator(d3.interpolateBuGn);
    
      // Construct the forces.
      const forceNode = d3.forceManyBody().strength(-300);
      const forceLink = d3.forceLink(edges).id((node) => node.i);
      const forceCollide = d3.forceCollide().radius(radius);
    
      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    
      const link = svg
        .append("g")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.2)
        .attr("stroke", "black")
        .selectAll("line.edge")
        .data(edges, (d) => d.i)
        .join("line")
        .classed("edge", true)
        .attr("stroke-opacity", (d) => linkOpacity(d.w));
    
      const node = svg
        .append("g")
        .attr("font-family", "Open Sans")
        .attr("text-anchor", "middle")
        .selectAll("g.node")
        .data(nodes, (d) => d.i)
        .join("g")
        .classed("node", true)
        .attr("key", (d) => d.i);
    
      const circle = node
        .append("circle")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("r", radius);
    
      const lower = node
        .append("text")
        .classed("lower", true)
        .attr("dy", radius / 2)
        .text((d) => d.lower);
    
      const name = node
        .append("text")
        .classed("name", true)
        .attr("dy", 22)
        .text((d) => d.name);
    
      // Set up events
    
      let quadtree = d3
        .quadtree()
        .x((d) => d.x)
        .y((d) => d.y)
        .addAll(nodes);
    
      const output = Object.assign(
        svg.node(),
        { value: null }
      );
    
      const ticked = () => {
        node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
    
        quadtree = d3
          .quadtree()
          .x((d) => d.x)
          .y((d) => d.y)
          .addAll(nodes);
      };
    
      const update = (focusNode) => {
        const focusLinks = _.filter(
          edges,
          (d) => focusNode?.i === d.s || focusNode?.i === d.t
        );
        const interestedLinks = focusLinks.map((d) => d.i);
        const interestedNodes = _.chain(focusLinks)
          .flatMap((p) => [p.s, p.t])
          .uniq()
          .value();
    
        const t = svg.transition().duration(75);
    
        if (focusNode) {
          svg
            .selectAll("line.edge")
            .filter((d) => interestedLinks.includes(d.i))
            .transition(t)
            .attr("stroke-opacity", 1)
            .attr("stroke", (d) => linkColor(d.w));
          svg
            .selectAll("line.edge")
            .filter((d) => !interestedLinks.includes(d.i))
            .transition(t)
            .attr("stroke", "black")
            .attr("stroke-opacity", 0.1);
          svg
            .selectAll("g.node")
            .filter((d) => interestedNodes.includes(d.i))
            .transition(t)
            .attr("opacity", 1);
          svg
            .selectAll("g.node")
            .filter((d) => !interestedNodes.includes(d.i))
            .transition(t)
            .attr("opacity", 0.15);
        } else {
          svg
            .selectAll("line.edge")
            .transition(t)
            .attr("stroke", "black")
            .attr("stroke-opacity", (d) => linkOpacity(d.w));
          svg.selectAll("g.node").transition(t).attr("opacity", 1);
        }
      };
    
      const handleHover = (root) => {
        function onMouseEnter(evt) {
          const pos = d3.pointer(evt, this);
          const d = quadtree.find(pos[0], pos[1], 30);
          update(d);
        }
        root.on("mousemove", _.debounce(onMouseEnter));
      };
    
      const handleClick = (node) => {
        node.on("click", function (evt) {
          output.value = d3.select(this).attr("key");
          evt.currentTarget.dispatchEvent(
            new CustomEvent("input", {
              bubbles: true
            })
          );
        });
      };
    
      const handleZoom = (evt) => {
        d3.select("svg").attr("transform", evt.transform);
      };
    
      const zoom = d3.zoom().on("zoom", handleZoom).scaleExtent([0.4, 3]);
    
      const simulation = d3
        .forceSimulation(nodes, (d) => d.i)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("collision", forceCollide)
        .on("tick", ticked);
    
      svg.call(handleHover);
      node.call(handleClick);
      svg.call(zoom);
    
    
      return output;
}*/

export default Home
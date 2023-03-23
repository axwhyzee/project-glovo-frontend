import { useEffect, useState } from 'react';
import _ from "lodash";

const _mkCounter = function*() {
    let i = 0;
    while (true) yield i++;
};

const _transform = (apiEdges, assignNodeId, assignEdgeId) => {
    const nodes = _.chain(apiEdges)
        .flatMap(({ src, dst }) => [src, dst])
        .uniq()
        .sort()
        .map((name, i) => ({ i: assignNodeId(), name }))
        .value();
    const association = _.chain(nodes)
        .map((p) => [p.name, p.i])
        .fromPairs()
        .value();
    const edges = _.chain(apiEdges)
        .map((e, i) => {
            const s = association[e.src];
            const t = association[e.dst];
            const w = e.k[0];
            return { i: assignEdgeId(), s, t, w, source: s, target: t };
        })
        .value();
    return { nodes, edges };
};

const _fetchGraph = async (assignNodeId, assignEdgeId) => {
    const data = await fetch(
        "https://project-glovo-api.onrender.com/edges/?n=100"
    ).then((r) => r.json());
    return _transform(data, assignNodeId, assignEdgeId);
}

const DUMMY_GRAPH = () => {
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
    ];

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
    })(nodes).map((d) => ({ ...d, source: d.s, target: d.t }));

    return { nodes, edges };
};

function DataLoader({ offline = false, setGraphData }) {
    const [nodeCounter, ] = useState(_mkCounter());
    const [edgeCounter, ] = useState(_mkCounter());

    useEffect(() => {
        const assignNodeId = () => nodeCounter.next().value;
        const assignEdgeId = () => edgeCounter.next().value;
        if (!offline) _fetchGraph(assignNodeId, assignEdgeId).then(p => setGraphData(p));
        else setGraphData(DUMMY_GRAPH());
    }, [offline, nodeCounter, edgeCounter, setGraphData]);

    return null;
}

export default DataLoader;
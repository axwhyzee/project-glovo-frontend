import _ from "lodash";


const API_URL = "https://project-glovo-api.onrender.com";

const OFFLINE_HEADERS = {
    cache: 'force-cache'
};

export const getAllPosts = () => fetch(`${API_URL}/news/`).then(r => r.json());
export const getPostsByKey = (val) => fetch(`${API_URL}/news/?key=${encodeURIComponent(val)}`).then(r => r.json());
export const getClusterByKey = (val) => fetch(`${API_URL}/cluster/?centroid=${encodeURIComponent(val)}`).then(r => r.json());
export const getAllPostsOffline = () => fetch(`${API_URL}/news/`, OFFLINE_HEADERS).then(r => r.json());

export const getEdges = () => fetch(`${API_URL}/edges/`).then(r => r.json());
export const getEdgesOffline = () => fetch(`${API_URL}/edges/`, OFFLINE_HEADERS).then(r => r.json());

export const getEdgesWithIds = async () => {
    const mkCounter = function*() {
        let i = 0;
        while (true) yield i++;
    };

    const transform = (apiEdges, assignNodeId, assignEdgeId) => {
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
                const w = e.weight;
                return { i: assignEdgeId(), s, t, w, source: s, target: t };
            })
            .value();
        return { nodes, edges };
    };

    const nodeCounter = mkCounter();
    const edgeCounter = mkCounter();
    const assignNodeId = () => nodeCounter.next().value;
    const assignEdgeId = () => edgeCounter.next().value;
    const data = await getEdges();
    return transform(data, assignNodeId, assignEdgeId);
};

import _ from "lodash";
import { useEffect, useMemo } from "react";

function Resolver({ data, queries, update }) {
    const nodes = useMemo(() => {
        const re = _.map(queries, q => ({ ...q, re: RegExp(q.query, 'i') }));
        const nodes = _.chain(data.nodes)
            .map((q) => {
                const query = _.find(re, d => d.re.test(q.name));
                if (query) return { i: q.i, color: query.color };
                else return null;
            })
            .filter()
            .value();
        return nodes;
    }, [data, queries])
    useEffect(() => {
        update(nodes);
    }, [queries]);
    return null;
}

export default Resolver;
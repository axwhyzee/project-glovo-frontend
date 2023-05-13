import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export const useD3 = (renderChartFn, dependencies) => {
    const ref = useRef();
    const [state, setState] = useState(undefined);

    useEffect(() => {
        setState(renderChartFn(d3.select(ref.current)));
        return () => {};
      }, dependencies);
    return [ref, state];
}

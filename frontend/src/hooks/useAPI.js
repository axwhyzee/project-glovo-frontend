import { useEffect, useState, useRef } from 'react';

export const useAPI = (fetchPromise, offline=false, offline_substitute=null) => {
    const [data, setData] = useState(undefined);
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current || offline) return;
        // Prevents secondary calls during strict mode
        fetched.current = true;
        fetchPromise()
            .then(r => setData(r));
        }, [fetchPromise, offline]);
        return offline ? offline_substitute : (data === undefined ? offline_substitute : data);
  }
import { useState, useEffect } from "react";

export enum LoadingState {
  PENDING,
  ERROR,
  DONE
}

const useFetch = <T, M = T>(
  url: string,
  resultMapper?: (res: T) => M,
  initialData?: M
): [M | undefined, LoadingState, Error | null] => {
  const [data, setData] = useState<M | undefined>(initialData);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.PENDING
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();

    const doFetch = async () => {
      try {
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) {
          throw new Error(
            `Error during fetching "${url}! HTTP ${res.status}: ${res.statusText}"`
          );
        }
        let data = await res.json();

        if (resultMapper) {
          data = resultMapper(data);
        }

        if (mounted) {
          setData(data);
          setLoadingState(LoadingState.DONE);
        }
      } catch (e) {
        setError(e);
        setLoadingState(LoadingState.ERROR);
      }
    };

    doFetch();

    const cleanup = () => {
      mounted = false;
      abortController.abort();
    };

    return cleanup;
  }, [url, resultMapper]);

  return [data, loadingState, error];
};

export default useFetch;

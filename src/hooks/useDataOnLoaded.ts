import { useEffect, useState } from 'react';

interface UseDataOnLoadedProps<T extends { length: number }> {
  data: T;
  loading: boolean;
  onLoaded?: () => void;
}

export function useDataOnLoaded<T extends { length: number }>({ data, loading, onLoaded }: UseDataOnLoadedProps<T>) {
  const [hasCalledOnLoaded, setHasCalledOnLoaded] = useState(false);

  useEffect(() => {
    if (!loading && data.length > 0 && !hasCalledOnLoaded) {
      onLoaded?.();
      setHasCalledOnLoaded(true);
    }
  }, [loading, data, onLoaded, hasCalledOnLoaded]);
}

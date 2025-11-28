import { useEffect, useState } from 'react';
import { AUTO_REFRESH_INTERVAL } from '../constants';

export const useAutoRefresh = (refetch: () => Promise<unknown>) => {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch().then(() => {
        setLastUpdate(new Date());
      });
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [refetch]);

  return { lastUpdate };
};


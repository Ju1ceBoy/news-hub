import { useEffect, useState, useRef } from 'react';
import { AUTO_REFRESH_INTERVAL } from '../constants';

// Минимальное время между запросами (3 минуты)
const MIN_REQUEST_INTERVAL = 1000 * 60 * 3;

export const useAutoRefresh = (refetch: () => Promise<unknown>) => {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const lastRequestTime = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime.current;

      // Пропускаем запрос, если предыдущий был недавно
      if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        console.log(
          `Пропуск автообновления. Прошло ${Math.round(timeSinceLastRequest / 1000)}s, требуется ${MIN_REQUEST_INTERVAL / 1000}s`
        );
        return;
      }

      lastRequestTime.current = now;
      refetch()
        .then(() => {
          setLastUpdate(new Date());
        })
        .catch((error) => {
          // Игнорируем ошибки при автообновлении, чтобы не показывать их пользователю
          // Ошибки будут обработаны в компоненте через состояние isError
          console.warn('Ошибка при автообновлении:', error);
        });
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [refetch]);

  return { lastUpdate };
};


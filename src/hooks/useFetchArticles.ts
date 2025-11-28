import { useQuery } from '@tanstack/react-query';
import { fetchArticles, RateLimitError } from '../services/api';
import { QUERY_STALE_TIME } from '../constants';

export const useFetchArticles = (year: number, month: number) => {
  return useQuery({
    queryKey: ['articles', year, month],
    queryFn: () => fetchArticles(year, month),
    staleTime: QUERY_STALE_TIME,
    // Отключаем все автоматические запросы
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      // Не повторяем запрос при ошибке 429 (Rate Limit)
      if (error instanceof RateLimitError) {
        return false;
      }
      // Для других ошибок делаем максимум 1 попытку
      return failureCount < 1;
    },
    retryDelay: (attemptIndex) => {
      // Экспоненциальная задержка: 2s, 4s, 8s...
      return Math.min(2000 * 2 ** attemptIndex, 30000);
    },
  });
};


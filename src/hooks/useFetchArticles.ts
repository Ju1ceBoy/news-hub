import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '../services/api';
import { QUERY_STALE_TIME, QUERY_RETRY_COUNT } from '../constants';

export const useFetchArticles = (year: number, month: number) => {
  return useQuery({
    queryKey: ['articles', year, month],
    queryFn: () => fetchArticles(year, month),
    staleTime: QUERY_STALE_TIME,
    retry: QUERY_RETRY_COUNT,
  });
};


import axios from 'axios';
import { Article, ApiResponse } from '../types/article';
import { NYT_API_BASE_URL, CORS_PROXY_URL } from '../constants';

const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchArticles = async (year: number, month: number): Promise<Article[]> => {
  const apiUrl = `${NYT_API_BASE_URL}/${year}/${month}.json?api-key=${NYT_API_KEY}`;
  const proxyUrl = `${CORS_PROXY_URL}${encodeURIComponent(apiUrl)}`;

  const response = await axios.get<ApiResponse>(proxyUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  return response.data.response.docs;
};


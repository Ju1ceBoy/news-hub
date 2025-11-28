import axios, { AxiosError } from 'axios';
import { Article, ApiResponse } from '../types/article';
import { NYT_API_BASE_URL, CORS_PROXY_URL } from '../constants';

const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export const fetchArticles = async (year: number, month: number): Promise<Article[]> => {
  const apiUrl = `${NYT_API_BASE_URL}/${year}/${month}.json?api-key=${NYT_API_KEY}`;
  const proxyUrl = `${CORS_PROXY_URL}${encodeURIComponent(apiUrl)}`;

  try {
    const response = await axios.get<ApiResponse>(proxyUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data.response.docs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response?.status === 429) {
        throw new RateLimitError(
          'Слишком много запросов. Пожалуйста, подождите немного перед повторной попыткой.'
        );
      }
      
      if (axiosError.response?.status) {
        throw new Error(
          `Ошибка сервера: ${axiosError.response.status} ${axiosError.response.statusText}`
        );
      }
      
      if (axiosError.request) {
        throw new Error('Не удалось подключиться к серверу. Проверьте подключение к интернету.');
      }
    }
    
    throw error;
  }
};


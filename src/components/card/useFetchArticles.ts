import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export interface Article {
  headline: {
    main: string;
  };
  abstract: string;
  pub_date: string; // Формат: "2023-01-01T00:00:00Z"
  section_name: string;
  web_url: string;
}

interface ApiResponse {
  response: {
    docs: Article[];
  };
}

export const groupArticlesByDay = (articles: Article[]) => {
  const grouped: Record<string, Article[]> = {};
  
  articles.forEach(article => {
    // Извлекаем только дату без времени (формат YYYY-MM-DD)
    const date = article.pub_date.split('T')[0];
    
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(article);
  });
  
  return grouped;
};

const fetchArticles = async (year: number, month: number): Promise<Article[]> => {
  const apiUrl = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${NYT_API_KEY}`;

  // ✅ Рабочий CORS-прокси
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;

  const response = await axios.get<ApiResponse>(proxyUrl, {
    headers: {
      Accept: "application/json",
    }
  });

  return response.data.response.docs;
};

export const useFetchArticles = (year: number, month: number) => {
  return useQuery({
    queryKey: ["articles", year, month],
    queryFn: () => fetchArticles(year, month),
    staleTime: 1000 * 60 * 5,
    retry: 2, // Автоматически повторить запрос при ошибке
  });
};
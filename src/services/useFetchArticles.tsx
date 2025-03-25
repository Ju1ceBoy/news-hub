// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const NYT_API_KEY = "vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh"; // Ваш API-ключ

// // Экспортируем тип Article
// export interface Article {
//   headline: {
//     main: string;
//   };
//   abstract: string;
//   pub_date: string;
//   section_name: string;
// }

// // Тип для ответа API
// interface ApiResponse {
//   response: {
//     docs: Article[];
//   };
// }

// // Функция для выполнения запроса к API
// // const fetchArticles = async (year: number, month: number): Promise<Article[]> => {
// //   // const url = `https://corsproxy.io/?url=https://https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`; // Используем прокси
// //   // const url = 'https://corsproxy.io/' + encodeURIComponent(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`);
// //   // const url = `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`;
// //   const url = `https://corsproxy.io/?${encodeURIComponent(
// //     `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`
// //   )}`;
// //   const response = await axios.get<ApiResponse>(url, {
// //     params: {
// //       "api-key": NYT_API_KEY,
// //     },
// //   });
// //   return response.data.response.docs;
// // };

// const fetchArticles = async (year: number, month: number): Promise<Article[]> => {
//   try {
//     // const url = `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`;
//     const url = `https://corsproxy.io/?${encodeURIComponent(
//       `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`
//     )}`;
//     const response = await axios.get<ApiResponse>(url, {
//       params: {
//         "api-key": NYT_API_KEY,
//       },
//     });
//     return response.data.response.docs;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error:", error.message);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//       } else {
//         console.error("Error:", error.message);
//       }
//     } else {
//       console.error("Unexpected error:", error);
//     }
//     throw error;
//   }
// };

// // Кастомный хук для запроса статей
// export const useFetchArticles = (year: number, month: number) => {
//   return useQuery({
//     queryKey: ["articles", year, month], // Уникальный ключ для запроса
//     queryFn: () => fetchArticles(year, month), // Функция для выполнения запроса
//     staleTime: 1000 * 60 * 5, // Данные считаются "свежими" в течение 5 минут
//   });
// };


import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NYT_API_KEY = "vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh"; // Ваш API-ключ

// Экспортируем тип Article
export interface Article {
  headline: {
    main: string;
  };
  abstract: string;
  pub_date: string;
  section_name: string;
}

// Тип для ответа API
interface ApiResponse {
  response: {
    docs: Article[];
  };
}

// Функция для выполнения запроса к API
const fetchArticles = async (year: number, month: number): Promise<Article[]> => {
  try {
    const url = `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`;
    // const url = `https://cors-proxy.fringe.zone/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh`;
    const response = await axios.get<ApiResponse>(url, {
      params: {
        "api-key": NYT_API_KEY,
      },
    });
    return response.data.response.docs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// Кастомный хук для запроса статей
export const useFetchArticles = (year: number, month: number) => {
  return useQuery({
    queryKey: ["articles", year, month], // Уникальный ключ для запроса
    queryFn: () => fetchArticles(year, month), // Функция для выполнения запроса
    staleTime: 1000 * 60 * 5, // Данные считаются "свежими" в течение 5 минут
  });
};
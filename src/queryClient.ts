import { QueryClient } from "@tanstack/react-query";

// Создаём экземпляр QueryClient с настройками для избежания лимитов API
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Отключаем автоматические запросы при фокусе окна
      refetchOnWindowFocus: false,
      // Отключаем автоматические запросы при переподключении
      refetchOnReconnect: false,
      // Отключаем автоматические запросы при монтировании, если данные свежие
      refetchOnMount: false,
      // Увеличиваем время, когда данные считаются свежими
      staleTime: 1000 * 60 * 10, // 10 минут
    },
  },
});
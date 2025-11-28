// API конфигурация
export const NYT_API_BASE_URL = 'https://api.nytimes.com/svc/archive/v1';
export const CORS_PROXY_URL = 'https://corsproxy.io/?';

// Настройки загрузки
export const INITIAL_ARTICLES_COUNT = 5;
export const ARTICLES_INCREMENT = 5;
export const LOAD_MORE_DELAY = 1000; // мс

// Настройки автообновления
export const AUTO_REFRESH_INTERVAL = 10000; // мс (10 секунд)

// Настройки React Query
export const QUERY_STALE_TIME = 1000 * 60 * 5; // 5 минут
export const QUERY_RETRY_COUNT = 2;

// Настройки Intersection Observer
export const INTERSECTION_THRESHOLD = 0.1;

// Минимальная ширина изображения
export const MIN_IMAGE_WIDTH = 600;


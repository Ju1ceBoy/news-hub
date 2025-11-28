import { Article } from '../types/article';

/**
 * Группирует статьи по дням публикации
 * @param articles - массив статей
 * @returns объект с ключами-датами (YYYY-MM-DD) и массивами статей
 */
export const groupArticlesByDay = (articles: Article[]): Record<string, Article[]> => {
  const grouped: Record<string, Article[]> = {};

  articles.forEach((article) => {
    // Извлекаем только дату без времени (формат YYYY-MM-DD)
    const date = article.pub_date.split('T')[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(article);
  });

  return grouped;
};

/**
 * Сортирует даты от новых к старым
 * @param dates - массив дат в формате YYYY-MM-DD
 * @returns отсортированный массив дат
 */
export const sortDatesDescending = (dates: string[]): string[] => {
  return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
};

/**
 * Сортирует статьи по дате публикации от новых к старым
 * @param articles - массив статей
 * @returns отсортированный массив статей
 */
export const sortArticlesByDate = (articles: Article[]): Article[] => {
  return [...articles].sort(
    (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
  );
};

/**
 * Ограничивает количество статей по дням
 * @param articlesByDay - объект со статьями, сгруппированными по дням
 * @param sortedDates - отсортированные даты
 * @param maxCount - максимальное количество статей
 * @returns объект с ограниченным количеством статей
 */
export const limitArticlesByCount = (
  articlesByDay: Record<string, Article[]>,
  sortedDates: string[],
  maxCount: number
): Record<string, Article[]> => {
  const limited: Record<string, Article[]> = {};
  let remainingCount = maxCount;

  for (const date of sortedDates) {
    if (remainingCount <= 0) break;

    const articlesForDay = articlesByDay[date];
    const takeCount = Math.min(articlesForDay.length, remainingCount);
    limited[date] = articlesForDay.slice(0, takeCount);
    remainingCount -= takeCount;
  }

  return limited;
};


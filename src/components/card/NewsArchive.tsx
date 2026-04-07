import { motion } from 'framer-motion';
import { useFetchArticles } from '../../hooks/useFetchArticles';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useAutoRefresh } from '../../hooks/useAutoRefresh';
import { groupArticlesByDay, sortDatesDescending, sortArticlesByDate, limitArticlesByCount } from '../../utils/articleUtils';
import { getBestImage } from '../../utils/imageUtils';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { ArticleWithMultimedia } from '../../types/article';
import { INITIAL_ARTICLES_COUNT, CATEGORY_SECTIONS } from '../../constants';
import styles from './News.module.scss';

interface NewsArchiveProps {
  year?: number;
  month?: number;
  category?: string;
}

function getLastMonth() {
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return { year: prev.getFullYear(), month: prev.getMonth() + 1 };
}

const defaults = getLastMonth();

function NewsArchive({ year = defaults.year, month = defaults.month, category }: NewsArchiveProps) {
  const { data: articles, isLoading, isError, error, refetch } = useFetchArticles(year, month);
  const { lastUpdate } = useAutoRefresh(refetch);

  const filteredArticles = articles
    ? category && CATEGORY_SECTIONS[category]
      ? articles.filter((a) => CATEGORY_SECTIONS[category].includes(a.section_name))
      : articles
    : [];
  
  const { visibleCount, isLoadingMore, loaderRef, hasMore } = useInfiniteScroll({
    totalItems: filteredArticles.length,
    initialCount: INITIAL_ARTICLES_COUNT,
  });

  const articlesByDay = groupArticlesByDay(filteredArticles);
  
  // Сортируем дни от новых к старым
  const sortedDates = sortDatesDescending(Object.keys(articlesByDay));

  // Сортируем статьи внутри каждого дня от новых к старым
  const sortedArticlesByDay: Record<string, ArticleWithMultimedia[]> = {};
  sortedDates.forEach((date) => {
    sortedArticlesByDay[date] = sortArticlesByDate(articlesByDay[date]);
  });

  // Ограничиваем количество отображаемых статей
  const limitedArticlesByDay = limitArticlesByCount(
    sortedArticlesByDay,
    sortedDates,
    visibleCount
  );

  if (isLoading) return <LoadingSpinner />;

  if (isError && error) {
    return <ErrorDisplay error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className={styles.news__container}>
      {lastUpdate && (
        <div className={styles.lastUpdate}>
          Last update: {lastUpdate.toLocaleTimeString()}
        </div>
      )}

      {Object.entries(limitedArticlesByDay).map(([date, dayArticles]) => (
        <section key={date} className={styles.daySection}>
          <motion.h2 
            className={styles.dayHeader}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {new Date(date).toLocaleDateString('en-EN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </motion.h2>
          
          <div className={styles.articlesGrid}>
            {dayArticles.map((article, index) => {
              const image = getBestImage(article.multimedia);
              
              return (
                <motion.article 
                  key={`${date}-${index}`}
                  className={styles.articleCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  onClick={() => window.open(article.web_url, '_blank')}
                >
                  {image && (
                    <div className={styles.imageContainer}>
                      <img 
                        src={image.url}
                        alt={image.caption || article.headline.main}
                        className={styles.articleImage}
                        loading="lazy"
                      />
                      {image.copyright && (
                        <span className={styles.imageCopyright}>© {image.copyright}</span>
                      )}
                    </div>
                  )}
                  
                  <div className={styles.articleContent}>
                    <h3>{article.headline.main}</h3>
                    <p>{article.abstract}</p>
                    <div className={styles.articleMeta}>
                      <span className={styles.section}>{article.section_name}</span>
                      <time className={styles.time}>
                        {new Date(article.pub_date).toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      ))}

      {/* Прелоадер для бесконечного скролла */}
      <div ref={loaderRef} className={styles.observerTarget}>
        {isLoadingMore && <LoadingSpinner />}
      </div>

      {/* Сообщение о конце списка */}
      {!hasMore && articles && articles.length > 0 && (
        <motion.div 
          className={styles.endMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Вы просмотрели все новости за этот период
        </motion.div>
      )}
    </div>
  );
}

export default NewsArchive;

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useFetchArticles, groupArticlesByDay, Article } from "./useFetchArticles";
import styles from "./News.module.scss";

interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

interface ArticleWithMultimedia extends Article {
  multimedia?: Multimedia[];
}

const LoadingSpinner = () => (
  <motion.div 
    className={styles.spinnerContainer}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className={styles.spinner}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  </motion.div>
);

function NewsArchive() {
  const year = 2025;
  const month = 3;
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const { data: articles, isLoading, isError, error, refetch } = useFetchArticles(year, month);

  // Автообновление каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      refetch().then(() => {
        setLastUpdate(new Date());
        // setVisibleCount(5);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch]);

  // Загрузка дополнительных новостей при скролле
  const loadMoreArticles = useCallback(() => {
    if (isLoadingMore || !articles || visibleCount >= articles.length) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 5);
      setIsLoadingMore(false);
    }, 1000);
  }, [isLoadingMore, articles, visibleCount]);

  // Наблюдатель за пересечением для бесконечного скролла
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreArticles();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMoreArticles]);

  // Группируем статьи по дням и сортируем
  const articlesByDay = groupArticlesByDay(articles || []);
  
  // Сортируем дни от новых к старым
  const sortedDates = Object.keys(articlesByDay).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // Сортируем статьи внутри каждого дня от новых к старым
  const sortedArticlesByDay: Record<string, ArticleWithMultimedia[]> = {};
  sortedDates.forEach(date => {
    sortedArticlesByDay[date] = [...articlesByDay[date]].sort((a, b) => 
      new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
    );
  });

  // Ограничиваем количество отображаемых статей
  let remainingCount = visibleCount;
  const limitedArticlesByDay: Record<string, ArticleWithMultimedia[]> = {};

  for (const date of sortedDates) {
    if (remainingCount <= 0) break;
    
    const articlesForDay = sortedArticlesByDay[date];
    const takeCount = Math.min(articlesForDay.length, remainingCount);
    limitedArticlesByDay[date] = articlesForDay.slice(0, takeCount);
    remainingCount -= takeCount;
  }


  const getBestImage = (multimedia: Multimedia[] | undefined) => {
    if (!multimedia || multimedia.length === 0) return null;
    
    const image = multimedia.find(media => 
      media.type === "image" && 
      media.subtype === "photo" &&
      media.width >= 600
    );
    
    return image || multimedia[0];
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h3>Произошла ошибка</h3>
      <p>{error.message}</p>
      <button onClick={() => refetch()} className={styles.retryButton}>
        Попробовать снова
      </button>
    </div>
  );

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
              year: 'numeric'
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
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  onClick={() => window.open(`${article.web_url}`, '_blank')}
                >
                  {image && (
                    <div className={styles.imageContainer}>
                      <img 
                        src={`https://www.nytimes.com/${image.url}`} 
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
                          minute: '2-digit'
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
      {articles && visibleCount >= articles.length && (
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
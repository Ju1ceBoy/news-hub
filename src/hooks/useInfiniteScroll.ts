import { useState, useEffect, useRef, useCallback } from 'react';
import { INTERSECTION_THRESHOLD, ARTICLES_INCREMENT, LOAD_MORE_DELAY } from '../constants';

interface UseInfiniteScrollOptions {
  totalItems: number;
  initialCount?: number;
  increment?: number;
}

export const useInfiniteScroll = ({
  totalItems,
  initialCount = 5,
  increment = ARTICLES_INCREMENT,
}: UseInfiniteScrollOptions) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoadingMore || visibleCount >= totalItems) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + increment);
      setIsLoadingMore(false);
    }, LOAD_MORE_DELAY);
  }, [isLoadingMore, totalItems, visibleCount, increment]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    const currentRef = loaderRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore]);

  return {
    visibleCount,
    isLoadingMore,
    loaderRef,
    hasMore: visibleCount < totalItems,
  };
};


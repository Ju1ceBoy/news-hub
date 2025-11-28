import { RateLimitError } from '../../services/api';
import styles from './ErrorDisplay.module.scss';

interface ErrorDisplayProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  const isRateLimit = error instanceof RateLimitError;

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>
        {isRateLimit ? '⏱️' : '⚠️'}
      </div>
      <h3>
        {isRateLimit ? 'Превышен лимит запросов' : 'Произошла ошибка'}
      </h3>
      <p>{error.message}</p>
      {isRateLimit && (
        <p className={styles.rateLimitHint}>
          Пожалуйста, подождите минуту перед повторной попыткой
        </p>
      )}
      <button onClick={onRetry} className={styles.retryButton}>
        Попробовать снова
      </button>
    </div>
  );
};


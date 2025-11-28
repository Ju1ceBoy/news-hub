import styles from './ErrorDisplay.module.scss';

interface ErrorDisplayProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => (
  <div className={styles.errorContainer}>
    <div className={styles.errorIcon}>⚠️</div>
    <h3>Произошла ошибка</h3>
    <p>{error.message}</p>
    <button onClick={onRetry} className={styles.retryButton}>
      Попробовать снова
    </button>
  </div>
);


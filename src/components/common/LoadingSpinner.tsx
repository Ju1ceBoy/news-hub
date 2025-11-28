import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => (
  <motion.div
    className={styles.spinnerContainer}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className={styles.spinner}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    />
  </motion.div>
);


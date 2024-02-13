// ComfortIndicator.js
import React from 'react';
import styles from '../ComfortIndicator.module.css';

const ComfortIndicator = ({ selected }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.indicator} style={{ left: `${selected * 20}%` }} />
      </div>
      <div className={styles.checkpoints}>
        <div className={styles.checkpoint}>Soft</div>
        <div className={styles.checkpoint}>Medium Soft</div>
        <div className={styles.checkpoint}>Medium</div>
        <div className={styles.checkpoint}>Medium Firm</div>
        <div className={styles.checkpoint}>Firm</div>
      </div>
    </div>
  );
};

export default ComfortIndicator;

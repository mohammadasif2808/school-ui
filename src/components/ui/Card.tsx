import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  headerActions?: React.ReactNode;
  padding?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, headerActions, padding }) => {
  return (
    <div className={`${styles.card} ${className}`} style={{ padding: padding }}>
      {(title || headerActions) && (
        <div className={styles.cardHeader}>
          {title && <h2 className={styles.cardTitle}>{title}</h2>}
          {headerActions && <div className={styles.headerActions}>{headerActions}</div>}
        </div>
      )}
      <div className={styles.cardBody}>
        {children}
      </div>
    </div>
  );
};

export default Card;

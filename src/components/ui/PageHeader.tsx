import React from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  breadcrumbs: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, actions }) => {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.breadcrumbs}>{breadcrumbs}</div>
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default PageHeader;

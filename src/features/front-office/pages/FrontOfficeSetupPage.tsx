import React, { useState } from 'react';
import styles from './FrontOfficeSetupPage.module.css';

const FrontOfficeSetupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    groupKey: 'Visitor Purpose',
    categoryName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Category Added:', formData);
    // Logic to add category would go here
    setFormData({ ...formData, categoryName: '' });
  };

  return (
    <div className={styles.pageContainer}>
      <div>
        <h1 className={styles.title}>Front Office Setup</h1>
        <div className={styles.breadcrumbs}>Dashboard / Front Office Setup</div>
      </div>

      <div className={styles.setupGrid}>
        {/* Left Column: Add Category */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Add Category</h2>
          </div>
          <div className={styles.cardBody}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Group Key <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="groupKey"
                  className={styles.input}
                  value={formData.groupKey}
                  onChange={handleChange}
                  placeholder="Visitor Purpose"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Category Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="categoryName"
                  className={styles.input}
                  value={formData.categoryName}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Add Category
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Categories Master List */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Categories Master List</h2>
          </div>
          <div className={styles.cardBody}>
            {/* Table or Empty State */}
            <div className={styles.emptyState}>
              No categories found. Start by adding one.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontOfficeSetupPage;

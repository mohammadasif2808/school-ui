import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddVisitorPage.module.css';

const AddVisitorPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    visitorName: '',
    phone: '',
    checkInTime: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:MM
    purpose: '',
    numberOfPersons: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Here you would typically call an API to save the visitor
    navigate('/front-office/visitors');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Add Visitor</h1>
          <div className={styles.breadcrumbs}>Dashboard / Visitors / Add</div>
        </div>
      </div>

      <div className={styles.contentCard}>
        <h2 className={styles.cardTitle}>Visitor Details</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Visitor Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="visitorName"
                className={styles.input}
                value={formData.visitorName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input
                type="tel"
                name="phone"
                className={styles.input}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Check In Time <span className={styles.required}>*</span>
              </label>
              <input
                type="datetime-local"
                name="checkInTime"
                className={styles.input}
                value={formData.checkInTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Purpose</label>
              <select
                name="purpose"
                className={styles.select}
                value={formData.purpose}
                onChange={handleChange}
              >
                <option value="">Select Purpose</option>
                <option value="interview">Interview</option>
                <option value="parent-meet">Parent Meet</option>
                <option value="admission">Admission</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Number of Persons</label>
              <input
                type="number"
                name="numberOfPersons"
                className={styles.input}
                min="1"
                value={formData.numberOfPersons}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Check In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVisitorPage;

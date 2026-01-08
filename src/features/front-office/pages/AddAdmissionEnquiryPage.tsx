import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddAdmissionEnquiryPage.module.css';

const AddAdmissionEnquiryPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Parent',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry Saved:', formData);
    navigate('/front-office/admission-enquiries');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>New Enquiry</h1>
          <div className={styles.breadcrumbs}>Dashboard / Enquiries / Add</div>
        </div>
      </div>

      <div className={styles.contentCard}>
        <h2 className={styles.cardTitle}>Enquiry Details</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name <span className={styles.required}>*</span></label>
              <input 
                type="text" 
                name="name" 
                className={styles.input} 
                value={formData.name} 
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
              <label className={styles.label}>Type <span className={styles.required}>*</span></label>
              <input 
                type="text" 
                name="type" 
                className={styles.input} 
                value={formData.type} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Description/Initial Note</label>
              <textarea 
                name="description" 
                className={styles.textarea} 
                value={formData.description} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>Save Enquiry</button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmissionEnquiryPage;
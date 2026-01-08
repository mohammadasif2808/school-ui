import React, { useState } from 'react';
import { Plus, X, ChevronsUpDown } from 'lucide-react';
import styles from './ComplaintsPage.module.css';

const ComplaintsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    complainantName: '',
    type: 'Parent',
    category: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Complaint Filed:', formData);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Complaints</h1>
          <div className={styles.breadcrumbs}>Dashboard / Front Office</div>
        </div>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> File Complaint
        </button>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.controlsRow} style={{ justifyContent: 'space-between' }}>
          <div className={styles.entriesControl}>
            Row Per Page 
            <select className={styles.entriesSelect}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            Entries
          </div>
          <div style={{ position: 'relative' }}>
             <input type="text" placeholder="Search" className={styles.searchInput} />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <div className={styles.thContent}>
                    Ref <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Complainant <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Against <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Type <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Status <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Description <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Action <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className={styles.noData}>No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>Prev</button>
          <button className={styles.pageBtn}>Next</button>
        </div>
      </div>

      {/* File Complaint Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>File Complaint</h2>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Complainant Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="complainantName"
                    className={styles.input}
                    value={formData.complainantName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Type <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="type"
                      className={styles.input}
                      value={formData.type}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Category</label>
                    <select
                      name="category"
                      className={styles.select}
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Academic">Academic</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Behavioral">Behavioral</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Complaint Description <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    name="description"
                    className={styles.textarea}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="submit" className={styles.submitButton}>
                  File Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsPage;

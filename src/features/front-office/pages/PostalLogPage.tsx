import React, { useState } from 'react';
import { Plus, X, ChevronsUpDown } from 'lucide-react';
import styles from './PostalLogPage.module.css';

const PostalLogPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    direction: 'Received',
    date: new Date().toISOString().slice(0, 10),
    postalType: '',
    fromTitle: '',
    toTitle: '',
    referenceNo: '',
    courierName: '',
    attachment: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Postal Record Saved:', formData);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Postal Dispatch/Receive</h1>
          <div className={styles.breadcrumbs}>Dashboard / Front Office</div>
        </div>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Postal
        </button>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.controlsRow} style={{ marginBottom: '24px' }}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Direction</label>
            <div className={styles.filterControls}>
              <select className={styles.selectInput}>
                <option value="All">All</option>
                <option value="Dispatch">Dispatch</option>
                <option value="Receive">Receive</option>
              </select>
              <button className={styles.filterButton}>Filter</button>
            </div>
          </div>
        </div>

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
             <input type="text" placeholder="Search" className={styles.searchInput} style={{ minWidth: '200px' }} />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <div className={styles.thContent}>
                    Type <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Ref No <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Title <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Date <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Link <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className={styles.noData}>No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>Prev</button>
          <button className={styles.pageBtn}>Next</button>
        </div>
      </div>

      {/* Add Postal Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Add Postal Record</h2>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Direction <span className={styles.required}>*</span>
                    </label>
                    <select
                      name="direction"
                      className={styles.select}
                      value={formData.direction}
                      onChange={handleChange}
                      required
                    >
                      <option value="Received">Received</option>
                      <option value="Dispatch">Dispatch</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Date <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      className={styles.input}
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Postal Type</label>
                  <select
                    name="postalType"
                    className={styles.select}
                    value={formData.postalType}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>
                    <option value="Letter">Letter</option>
                    <option value="Parcel">Parcel</option>
                  </select>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>From Title</label>
                    <input
                      type="text"
                      name="fromTitle"
                      className={styles.input}
                      value={formData.fromTitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>To Title</label>
                    <input
                      type="text"
                      name="toTitle"
                      className={styles.input}
                      value={formData.toTitle}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Reference No</label>
                    <input
                      type="text"
                      name="referenceNo"
                      className={styles.input}
                      value={formData.referenceNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Courier Name</label>
                    <input
                      type="text"
                      name="courierName"
                      className={styles.input}
                      value={formData.courierName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Attachment</label>
                  <div className={styles.fileInputContainer}>
                    <label className={styles.fileButton}>
                      Choose File
                      <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                    </label>
                    <span className={styles.fileName}>
                      {formData.attachment ? formData.attachment.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="submit" className={styles.submitButton}>
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostalLogPage;

import React, { useState } from 'react';
import { Plus, X, ChevronsUpDown } from 'lucide-react';
import styles from './PhoneCallLogPage.module.css';

const PhoneCallLogPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    callerName: '',
    phoneNumber: '',
    direction: 'Incoming',
    dateTime: new Date().toISOString().slice(0, 16),
    callType: '',
    purpose: '',
    duration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Phone Log Saved:', formData);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Phone Call Log</h1>
          <div className={styles.breadcrumbs}>Dashboard / Front Office</div>
        </div>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Log Call
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
             <input type="text" placeholder="Search" className={styles.searchInput} style={{ minWidth: '200px' }} />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <div className={styles.thContent}>
                    Name <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Phone <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Date <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Type <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Duration <ChevronsUpDown size={14} className={styles.sortIcon} />
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
                <td colSpan={6} className={styles.noData}>No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>Prev</button>
          <button className={styles.pageBtn}>Next</button>
        </div>
      </div>

      {/* Log Call Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Log Phone Call</h2>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                  <label className={styles.label}>Caller Name</label>
                  <input
                    type="text"
                    name="callerName"
                    className={styles.input}
                    value={formData.callerName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                  <label className={styles.label}>
                    Phone Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className={styles.input}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
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
                      <option value="Incoming">Incoming</option>
                      <option value="Outgoing">Outgoing</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Date & Time</label>
                    <input
                      type="datetime-local"
                      name="dateTime"
                      className={styles.input}
                      value={formData.dateTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.formGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Call Type</label>
                    <select
                      name="callType"
                      className={styles.select}
                      value={formData.callType}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="Inquiry">Inquiry</option>
                      <option value="Follow-up">Follow-up</option>
                    </select>
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
                      <option value="Admission">Admission</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Duration (Seconds)</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g. 120"
                    className={styles.input}
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="submit" className={styles.submitButton} style={{ width: 'auto' }}>
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneCallLogPage;

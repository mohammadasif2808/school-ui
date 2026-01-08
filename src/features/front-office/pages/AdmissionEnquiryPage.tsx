import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronsUpDown } from 'lucide-react';
import styles from './AdmissionEnquiryPage.module.css';

const AdmissionEnquiryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('All Status');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Admission Enquiries</h1>
          <div className={styles.breadcrumbs}>Dashboard / Front Office</div>
        </div>
        <button 
          className={styles.addButton}
          onClick={() => navigate('/front-office/admission-enquiries/add')}
        >
          <Plus size={18} /> New Enquiry
        </button>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.filterRow} style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '800px' }}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Search</label>
            <input 
              type="text" 
              placeholder="Search Name/Phone" 
              className={styles.input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Status</label>
            <select 
              className={styles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Passive</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </div>
          <button className={styles.filterButton} style={{ alignSelf: 'flex-end' }}>Filter</button>
        </div>

        <div className={styles.controlsRow}>
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
                    Source <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Status <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Next Follow Up <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Assigned To <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Actions <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className={styles.noData}>No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>Prev</button>
          <button className={styles.pageBtn}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquiryPage;
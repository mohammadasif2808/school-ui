import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, Download, ChevronsUpDown } from 'lucide-react';
import styles from './StudentsPage.module.css';

const StudentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('Select Class');
  const [rowsPerPage, setRowsPerPage] = useState('10');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Students</h1>
          <div className={styles.breadcrumbs}>Dashboard / Students</div>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.importButton}>
            <Upload size={18} /> Import
          </button>
          <button className={styles.exportButton}>
            <Download size={18} /> Export
          </button>
          <button 
            className={styles.addButton}
            onClick={() => navigate('/students/create')}
          >
            <Plus size={18} /> Create Student
          </button>
        </div>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Search by Name/ID</label>
            <input 
              type="text" 
              placeholder="Search..." 
              className={styles.input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Filter by Class</label>
            <select 
              className={styles.select}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option>Select Class</option>
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
              <option>Class 4</option>
              <option>Class 5</option>
              <option>Class 6</option>
              <option>Class 7</option>
              <option>Class 8</option>
              <option>Class 9</option>
              <option>Class 10</option>
            </select>
          </div>
          <button className={styles.filterButton}>Search</button>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.entriesControl}>
            Row Per Page 
            <select 
              className={styles.entriesSelect}
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(e.target.value)}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
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
                    ID <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Name <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Class <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Admission No <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Contact <ChevronsUpDown size={14} className={styles.sortIcon} />
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
    </div>
  );
};

export default StudentsPage;

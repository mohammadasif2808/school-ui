import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import styles from './HalfDayNoticesPage.module.css';

const HalfDayNoticesPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedClass, setSelectedClass] = useState('All Classes');

  return (
    <div className={styles.pageContainer}>
      <div>
        <h1 className={styles.title}>Half Day Notices</h1>
        <div className={styles.breadcrumbs}>Dashboard / Front Office</div>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Date</label>
            <input 
              type="date" 
              className={styles.input}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Class</label>
            <select 
              className={styles.select}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option>All Classes</option>
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
            </select>
          </div>
          <button className={styles.filterButton}>Filter</button>
          <button className={styles.printButton}>
            <Printer size={18} /> Print / Download
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>#</th>
                <th>Student Name</th>
                <th>Class - Section</th>
                <th>Out Time</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className={styles.noData}>
                  No Half Day records found for this date.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HalfDayNoticesPage;

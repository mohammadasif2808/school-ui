import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Save, 
  Hash, 
  RotateCcw,
  Users,
  CheckCircle2
} from 'lucide-react';
import styles from './RollNumbersPage.module.css';

// Mock Data
const MOCK_STUDENTS = [
  { id: 1, admissionNo: 'ADM001', name: 'Aarav Patel', gender: 'Male', oldRoll: '10', newRoll: '11' },
  { id: 2, admissionNo: 'ADM002', name: 'Aditi Rao', gender: 'Female', oldRoll: '11', newRoll: '12' },
  { id: 3, admissionNo: 'ADM003', name: 'Arjun Singh', gender: 'Male', oldRoll: '12', newRoll: '13' },
  { id: 4, admissionNo: 'ADM004', name: 'Diya Sharma', gender: 'Female', oldRoll: '13', newRoll: '14' },
  { id: 5, admissionNo: 'ADM005', name: 'Ishaan Gupta', gender: 'Male', oldRoll: '14', newRoll: '15' },
  { id: 6, admissionNo: 'ADM006', name: 'Kavya Iyer', gender: 'Female', oldRoll: '15', newRoll: '16' },
  { id: 7, admissionNo: 'ADM007', name: 'Rohan Malhotra', gender: 'Male', oldRoll: '16', newRoll: '17' },
  { id: 8, admissionNo: 'ADM008', name: 'Saanvi Verma', gender: 'Female', oldRoll: '17', newRoll: '18' },
];

const RollNumbersPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [students, setStudents] = useState<typeof MOCK_STUDENTS>([]);
  const [sortOrder, setSortOrder] = useState<'name' | 'adm'>('name');

  const handleFetchStudents = () => {
    if (!selectedClass) {
      alert('Please select a class first.');
      return;
    }
    // Simulate fetch and optional sort
    const sorted = [...MOCK_STUDENTS].sort((a, b) => 
      sortOrder === 'name' ? a.name.localeCompare(b.name) : a.admissionNo.localeCompare(b.admissionNo)
    );
    setStudents(sorted);
    setIsFetched(true);
  };

  const handleRollChange = (id: number, val: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, newRoll: val } : s));
  };

  const handleAutoFill = () => {
    if (students.length === 0) return;
    const start = 1;
    setStudents(prev => prev.map((s, idx) => ({ ...s, newRoll: String(start + idx) })));
  };

  const handleSave = () => {
    console.log('Saving Roll Numbers:', students);
    alert('Roll numbers updated successfully!');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Assign Roll Numbers</h1>
          <div className={styles.breadcrumbs}>Dashboard / Students / Roll Numbers</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className={styles.controlPanel}>
        <div className={styles.filterGroup}>
          <div className={styles.sectionTitle}>
            <Filter size={18} /> Select Class & Section
          </div>
          <div className={styles.controls}>
            <div className={styles.formGroup}>
              <select
                className={styles.select}
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setIsFetched(false);
                }}
              >
                <option value="">Select Class</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`Class ${i + 1} - A`}>Class {i + 1} - A</option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
               <select 
                className={styles.select}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'name' | 'adm')}
              >
                <option value="name">Sort by Name</option>
                <option value="adm">Sort by Admission No</option>
              </select>
            </div>

            <button className={styles.fetchButton} onClick={handleFetchStudents}>
              <Search size={16} /> Fetch Students
            </button>
          </div>
        </div>
      </div>

      {/* Student List & Action Area */}
      <div className={styles.listContainer}>
        {isFetched ? (
          <>
            <div className={styles.listHeader}>
              <div className={styles.listTitle}>
                <Users size={20} className={styles.headerIcon} /> Student List
              </div>
              <div className={styles.headerActions}>
                <button className={styles.secondaryBtn} onClick={handleAutoFill}>
                  <RotateCcw size={16} /> Auto-Fill Sequence
                </button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Admission No</th>
                    <th>Student Name</th>
                    <th>Gender</th>
                    <th>Current Roll No</th>
                    <th>New Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className={styles.monoText}>{student.admissionNo}</td>
                      <td>
                        <div className={styles.avatarCell}>
                          <div className={styles.avatar}>{student.name.charAt(0)}</div>
                          <span className={styles.studentName}>{student.name}</span>
                        </div>
                      </td>
                      <td>{student.gender}</td>
                      <td className={styles.textMuted}>{student.oldRoll || '-'}</td>
                      <td>
                        <div className={styles.inputWrapper}>
                          <Hash size={14} className={styles.inputIcon} />
                          <input 
                            type="text" 
                            className={styles.rollInput}
                            value={student.newRoll}
                            onChange={(e) => handleRollChange(student.id, e.target.value)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.listFooter}>
              <div className={styles.footerInfo}>
                Showing {students.length} students
              </div>
              <button className={styles.saveButton} onClick={handleSave}>
                <Save size={18} /> Save Changes
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconCircle}>
              <Hash size={40} />
            </div>
            <h3>No Class Selected</h3>
            <p>Select a class and section above to manage student roll numbers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RollNumbersPage;
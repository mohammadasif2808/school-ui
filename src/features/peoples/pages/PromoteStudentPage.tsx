import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  CheckCircle2, 
  ArrowUpCircle,
  Filter 
} from 'lucide-react';
import styles from './PromoteStudentPage.module.css';

// Mock Data for Students
const MOCK_STUDENTS = [
  { id: 1, name: 'Aarav Patel', rollNo: '101', currentClass: 'Class 5 - A', result: 'Pass', grade: 'A' },
  { id: 2, name: 'Vivaan Singh', rollNo: '102', currentClass: 'Class 5 - A', result: 'Pass', grade: 'B+' },
  { id: 3, name: 'Aditya Kumar', rollNo: '103', currentClass: 'Class 5 - A', result: 'Pass', grade: 'A+' },
  { id: 4, name: 'Vihaan Gupta', rollNo: '104', currentClass: 'Class 5 - A', result: 'Pass', grade: 'B' },
  { id: 5, name: 'Arjun Sharma', rollNo: '105', currentClass: 'Class 5 - A', result: 'Pass', grade: 'A' },
  { id: 6, name: 'Sai Iyer', rollNo: '106', currentClass: 'Class 5 - A', result: 'Pass', grade: 'A+' },
  { id: 7, name: 'Reyansh Das', rollNo: '107', currentClass: 'Class 5 - A', result: 'Pass', grade: 'C' },
  { id: 8, name: 'Ayan Malhotra', rollNo: '108', currentClass: 'Class 5 - A', result: 'Pass', grade: 'B' },
];

const PromoteStudentPage: React.FC = () => {
  const [sourceClass, setSourceClass] = useState('');
  const [destinationClass, setDestinationClass] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [students, setStudents] = useState<typeof MOCK_STUDENTS>([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);

  const handleFetchStudents = () => {
    if (!sourceClass) {
      alert('Please select a source class first.');
      return;
    }
    // Simulate API fetch
    setStudents(MOCK_STUDENTS);
    setIsFetched(true);
    // Reset selection when fetching new data
    setSelectedStudentIds([]); 
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStudentIds(students.map(s => s.id));
    } else {
      setSelectedStudentIds([]);
    }
  };

  const handleSelectStudent = (id: number) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handlePromote = () => {
    if (!destinationClass) {
      alert('Please select a destination class.');
      return;
    }
    if (selectedStudentIds.length === 0) {
      alert('Please select at least one student to promote.');
      return;
    }
    alert(`Successfully promoted ${selectedStudentIds.length} students to ${destinationClass}!`);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Promote Students</h1>
          <div className={styles.breadcrumbs}>Dashboard / Students / Promote</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className={styles.controlPanel}>
        <div className={styles.panelSection}>
          <div className={styles.sectionTitle}>
            <Filter size={18} /> Select Source
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Class & Section</label>
            <select
              className={styles.select}
              value={sourceClass}
              onChange={(e) => {
                setSourceClass(e.target.value);
                setIsFetched(false); // Reset list if class changes
              }}
            >
              <option value="">Select Class</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`Class ${i + 1} - A`}>Class {i + 1} - A</option>
              ))}
            </select>
          </div>
          <button className={styles.fetchButton} onClick={handleFetchStudents}>
            <Search size={16} /> Fetch Students
          </button>
        </div>

        <div className={styles.panelSection}>
          <div className={styles.sectionTitle}>
            <ArrowUpCircle size={18} /> Promote To
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Destination Class & Section</label>
            <select
              className={styles.select}
              value={destinationClass}
              onChange={(e) => setDestinationClass(e.target.value)}
            >
              <option value="">Select Destination Class</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`Class ${i + 1} - A`}>Class {i + 1} - A</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student List Section */}
      <div className={styles.listContainer}>
        {isFetched ? (
          <>
            <div className={styles.listHeader}>
              <div className={styles.listTitle}>Student List</div>
              <div className={styles.selectionInfo}>
                <span className={styles.selectedCount}>{selectedStudentIds.length}</span> students selected
              </div>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>
                      <input 
                        type="checkbox" 
                        className={styles.checkbox}
                        checked={students.length > 0 && selectedStudentIds.length === students.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Student Details</th>
                    <th>Current Result</th>
                    <th>Grade</th>
                    <th>Next Session Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          className={styles.checkbox}
                          checked={selectedStudentIds.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                        />
                      </td>
                      <td>
                        <div className={styles.avatarCell}>
                          <div className={styles.avatar}>{student.name.charAt(0)}</div>
                          <div className={styles.nameInfo}>
                            <span className={styles.studentName}>{student.name}</span>
                            <span className={styles.rollNo}>Roll No: {student.rollNo}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.statusBadge}>{student.result}</span>
                      </td>
                      <td>
                        <span className={styles.gradeBadge}>{student.grade}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '14px', color: '#2b3674' }}>
                          Promote to {destinationClass || '...'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.listFooter}>
              <button 
                className={styles.promoteBtn} 
                onClick={handlePromote}
                disabled={selectedStudentIds.length === 0 || !destinationClass}
              >
                <CheckCircle2 size={18} /> Promote Selected Students
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <Users size={48} color="#e0e5f2" />
            <p>Select a source class and click "Fetch Students" to proceed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoteStudentPage;
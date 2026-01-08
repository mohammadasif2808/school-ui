import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Upload, 
  Download, 
  ChevronsUpDown, 
  MoreVertical,
  Eye,
  Edit,
  Lock,
  EyeOff,
  RotateCw,
  Shield,
  Trash2
} from 'lucide-react';
import styles from './StaffPage.module.css';

interface Staff {
  id: number;
  name: string;
  type: string;
  roleCount: number;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
  joiningDate: string;
}

const MOCK_STAFF: Staff[] = [
  { id: 6, name: 'Deepak Roy', type: 'Non-Teaching', roleCount: 1, phone: '7447756849', email: 'deepak.roy@schoolmail.com', status: 'Active', joiningDate: '02 Apr 2021' },
  { id: 10, name: 'Karan Reddy', type: 'Teaching', roleCount: 1, phone: '9731159013', email: 'karan.reddy@peltownmail.com', status: 'Active', joiningDate: '05 Jun 2019' },
  { id: 5, name: 'Aisha Mishra', type: 'Teacher', roleCount: 2, phone: '7684467854', email: 'aisha.mishra@peltownmail.com', status: 'Active', joiningDate: '03 Feb 2019' },
  { id: 11, name: 'Sana Mehta', type: 'Non-Teaching', roleCount: 1, phone: '9339216473', email: 'sana.mehta@peltownmail.com', status: 'Active', joiningDate: '12 Sep 2020' },
  { id: 12, name: 'Fatima Joshi', type: 'Non-Teaching', roleCount: 1, phone: '8427229391', email: 'fatima.joshi@peltownmail.com', status: 'Active', joiningDate: '18 Nov 2019' },
  { id: 16, name: 'Ananya Nair', type: 'Non-Teaching', roleCount: 1, phone: '8439450308', email: 'ananya.nair@example.com', status: 'Active', joiningDate: '15 Aug 2022' },
  { id: 14, name: 'Sana Bansal', type: 'Non-Teaching', roleCount: 1, phone: '7852366923', email: 'sana.bansal@schoolmail.com', status: 'Active', joiningDate: '10 Jan 2021' },
  { id: 13, name: 'Arjun Bansal', type: 'Non-Teaching', roleCount: 1, phone: '7382453531', email: 'arjun.bansal@schoolmail.com', status: 'Active', joiningDate: '19 Mar 2019' },
];

const StaffPage: React.FC = () => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActiveActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleActionMenu = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveActionMenu(activeActionMenu === id ? null : id);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Staff List</h1>
          <div className={styles.breadcrumbs}>Dashboard / Staff</div>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.exportButton}>
            <Download size={18} /> Export
          </button>
          <button className={styles.importButton}>
            <Upload size={18} /> Import
          </button>
          <button 
            className={styles.addButton}
            onClick={() => navigate('/staff/add')}
          >
            <Plus size={18} /> Add Staff
          </button>
        </div>
      </div>

      <div className={styles.contentCard}>
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
             <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{width: '60px'}}>
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
                    Type <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Roles <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Phone <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Email <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Status <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.thContent}>
                    Joining Date <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
                <th style={{textAlign: 'right'}}>
                  <div className={`${styles.thContent} ${styles.alignRight}`}>
                    Actions <ChevronsUpDown size={14} className={styles.sortIcon} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STAFF.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.id}</td>
                  <td className={styles.nameCell}>{staff.name}</td>
                  <td>{staff.type}</td>
                  <td>
                    <span className={styles.roleBadge}>{staff.roleCount}</span>
                  </td>
                  <td>{staff.phone}</td>
                  <td>{staff.email}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.activeStatus}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td>{staff.joiningDate}</td>
                  <td className={styles.actionCell}>
                    <button 
                      className={styles.actionToggleBtn}
                      onClick={(e) => toggleActionMenu(staff.id, e)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {activeActionMenu === staff.id && (
                      <div className={styles.actionMenu} ref={actionMenuRef}>
                        <div className={styles.actionItem} onClick={() => console.log('View', staff.id)}>
                          <Eye size={14} /> View Staff
                        </div>
                        <div className={styles.actionItem} onClick={() => console.log('Edit', staff.id)}>
                          <Edit size={14} /> Edit
                        </div>
                        <div className={styles.actionItem} onClick={() => console.log('Login Details', staff.id)}>
                          <Lock size={14} /> Login Details
                        </div>
                        <div className={styles.actionItem} onClick={() => console.log('Disable Login', staff.id)}>
                          <EyeOff size={14} /> Disable Login
                        </div>
                        <div className={styles.actionItem} onClick={() => console.log('Reset Password', staff.id)}>
                          <RotateCw size={14} /> Reset Password
                        </div>
                        <div className={styles.actionItem} onClick={() => console.log('Assign Roles', staff.id)}>
                          <Shield size={14} /> Assign Roles
                        </div>
                        <div className={`${styles.actionItem} ${styles.deleteAction}`} onClick={() => console.log('Delete', staff.id)}>
                          <Trash2 size={14} /> Delete
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>Previous</button>
          <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
          <button className={styles.pageBtn}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import styles from './VisitorsLogPage.module.css';

// Standardized UI Components
import PageHeader from '../../../components/ui/PageHeader';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VisitorsLogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [purpose, setPurpose] = useState('All Purposes');

  const purposeOptions = [
    { value: 'All Purposes', label: 'All Purposes' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Parent Meet', label: 'Parent Meet' },
    { value: 'Admission', label: 'Admission' },
  ];

  const entriesOptions = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
  ];

  return (
    <div className={styles.pageContainer}>
      <PageHeader 
        title="Visitors Log" 
        breadcrumbs="Dashboard / Front Office"
        actions={
          <Button 
            icon={<Plus size={18} />} 
            onClick={() => navigate('/front-office/visitors/add')}
          >
            Add Visitor
          </Button>
        }
      />

      <Card>
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <Input 
              label="Search" 
              placeholder="Search Name/Phone" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select 
              label="Purpose" 
              options={purposeOptions}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
            <Button variant="primary" className={styles.filterButton}>Filter</Button>
          </div>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.entriesControl}>
            <span>Row Per Page</span>
            <Select 
              options={entriesOptions} 
              className={styles.entriesSelect}
            />
            <span>Entries</span>
          </div>
          <div className={styles.tableSearch}>
             <Input 
               placeholder="Search..." 
               icon={<Search size={16} />} 
             />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Purpose</th>
                <th>Meet</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Action</th>
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
          <Button variant="ghost" size="sm">Prev</Button>
          <Button variant="ghost" size="sm">Next</Button>
        </div>
      </Card>
    </div>
  );
};

export default VisitorsLogPage;
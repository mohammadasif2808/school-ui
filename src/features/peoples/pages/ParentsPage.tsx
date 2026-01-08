import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  RotateCcw, 
  MoreVertical, 
  Phone, 
  Mail, 
  User, 
  Users 
} from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import styles from './ParentsPage.module.css';

// Mock Data for demonstration
const MOCK_PARENTS = [
  {
    id: 1,
    name: 'Robert Fox',
    relation: 'Father',
    phone: '+91 98765 43210',
    email: 'robert.fox@example.com',
    children: [
      { name: 'Cody Fisher', class: 'Class 10-A' },
      { name: 'Jane Fisher', class: 'Class 8-B' }
    ],
    isPrimary: true,
  },
  {
    id: 2,
    name: 'Esther Howard',
    relation: 'Mother',
    phone: '+91 98765 43211',
    email: 'esther.h@example.com',
    children: [
      { name: 'Cody Fisher', class: 'Class 10-A' }
    ],
    isPrimary: false,
  },
  {
    id: 3,
    name: 'Jenny Wilson',
    relation: 'Guardian',
    phone: '+91 98765 43212',
    email: 'jenny.w@example.com',
    children: [
      { name: 'Bessie Cooper', class: 'Class 5-C' }
    ],
    isPrimary: true,
  },
  {
    id: 4,
    name: 'Guy Hawkins',
    relation: 'Father',
    phone: '+91 98765 43213',
    email: 'guy.hawk@example.com',
    children: [
      { name: 'Cameron Williamson', class: 'Class 2-A' }
    ],
    isPrimary: true,
  },
  {
    id: 5,
    name: 'Kristin Watson',
    relation: 'Mother',
    phone: '+91 98765 43214',
    email: 'kristin.w@example.com',
    children: [
      { name: 'Cameron Williamson', class: 'Class 2-A' }
    ],
    isPrimary: false,
  },
];

const ParentsPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [hasSiblings, setHasSiblings] = useState(false);

  const handleReset = () => {
    setSelectedClass('');
    setSelectedType('');
    setKeyword('');
    setHasSiblings(false);
  };

  // Filter logic (basic implementation)
  const filteredParents = MOCK_PARENTS.filter(parent => {
    const matchesKeyword = parent.name.toLowerCase().includes(keyword.toLowerCase()) || 
                           parent.email.toLowerCase().includes(keyword.toLowerCase()) ||
                           parent.phone.includes(keyword);
    const matchesType = selectedType ? parent.relation === selectedType : true;
    const matchesSiblings = hasSiblings ? parent.children.length > 1 : true;

    // Note: Class filtering would check children array, simplifying for UI demo
    return matchesKeyword && matchesType && matchesSiblings;
  });

  const getRelationBadgeColor = (relation: string) => {
    switch(relation.toLowerCase()) {
      case 'father': return '#e3f2fd'; // Light Blue
      case 'mother': return '#fce4ec'; // Light Pink
      case 'guardian': return '#e8f5e9'; // Light Green
      default: return '#f5f5f5';
    }
  };

  const getRelationTextColor = (relation: string) => {
    switch(relation.toLowerCase()) {
      case 'father': return '#1976d2';
      case 'mother': return '#c2185b';
      case 'guardian': return '#388e3c';
      default: return '#616161';
    }
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader 
        title="Guardians List" 
        breadcrumbs="Dashboard / People / Guardians"
        actions={
          <button className={styles.exportButton}>
            <Download size={18} /> Export CSV
          </button>
        }
      />

      <Card className={styles.filterCard}>
        <div className={styles.filterBar}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              className={styles.searchInput}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className={styles.filtersGroup}>
            <select 
              className={styles.filterSelect}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">All Classes</option>
              {[...Array(10)].map((_, i) => <option key={i} value={`Class ${i+1}`}>Class {i+1}</option>)}
            </select>

            <select 
              className={styles.filterSelect}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Relations</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
            </select>

            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={hasSiblings}
                onChange={(e) => setHasSiblings(e.target.checked)}
              />
              Has Siblings?
            </label>

            <button className={styles.resetButton} onClick={handleReset} title="Reset Filters">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </Card>

      <Card className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Guardian Name</th>
                <th>Relationship</th>
                <th>Contact Details</th>
                <th>Children (Ward)</th>
                <th className={styles.textCenter}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParents.length > 0 ? (
                filteredParents.map((parent, index) => (
                  <tr key={parent.id}>
                    <td className={styles.textMuted}>{index + 1}</td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>
                          {parent.name.charAt(0)}
                        </div>
                        <div className={styles.userInfo}>
                          <span className={styles.userName}>{parent.name}</span>
                          {parent.isPrimary && <span className={styles.primaryBadge}>Primary</span>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span 
                        className={styles.relationBadge}
                        style={{
                          backgroundColor: getRelationBadgeColor(parent.relation),
                          color: getRelationTextColor(parent.relation)
                        }}
                      >
                        {parent.relation}
                      </span>
                    </td>
                    <td>
                      <div className={styles.contactCell}>
                        <div className={styles.contactRow}>
                          <Phone size={14} className={styles.iconMuted} />
                          <span>{parent.phone}</span>
                        </div>
                        <div className={styles.contactRow}>
                          <Mail size={14} className={styles.iconMuted} />
                          <span className={styles.emailText}>{parent.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.childrenList}>
                        {parent.children.map((child, idx) => (
                          <div key={idx} className={styles.childTag}>
                            <User size={12} /> {child.name} <span className={styles.childClass}>({child.class})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className={styles.textCenter}>
                      <button className={styles.actionButton}>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noDataState}>
                    <div className={styles.noDataContent}>
                      <Users size={48} className={styles.noDataIcon} />
                      <h3>No guardians found</h3>
                      <p>Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Simple Pagination Demo */}
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>Showing {filteredParents.length} of {MOCK_PARENTS.length} entries</span>
          <div className={styles.pageButtons}>
            <button className={styles.pageBtn} disabled>Previous</button>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ParentsPage;

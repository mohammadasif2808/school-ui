import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Presentation, 
  Calendar, 
  ClipboardList, 
  UserCheck, 
  Receipt, 
  BookOpen, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
  LucideIcon
} from 'lucide-react';
import styles from './DashboardPage.module.css';

// Reusable Components
interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  active?: string | number;
  inactive?: string | number;
  iconBg: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, active, inactive, iconBg, iconColor }) => (
  <div className={styles.statCard}>
    <div className={styles.statHeader}>
      <div className={styles.statIconWrapper} style={{ backgroundColor: iconBg, color: iconColor }}>
        <Icon size={30} />
      </div>
      <div className={styles.statContent}>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
    
    {active !== undefined && (
      <>
        <div className={styles.statDivider}></div>
        <div className={styles.statFooter}>
          <span>Active: <strong>{active}</strong></span>
          <span>Inactive: <strong>{inactive}</strong></span>
        </div>
      </>
    )}
  </div>
);

interface QuickLinkProps {
  icon: LucideIcon;
  label: string;
  color: string;
  bg: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ icon: Icon, label, color, bg }) => (
  <div className={styles.quickLinkItem} style={{ backgroundColor: bg }}>
    <div className={styles.quickLinkIcon} style={{ backgroundColor: 'white', color: color }}>
      <Icon size={24} />
    </div>
    <div className={styles.quickLinkLabel}>{label}</div>
  </div>
);

const CalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const days: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const getDaysInMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  const dates: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  const monthNames: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const isToday = (day: number): boolean => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionTitle}>
        <span>Schedules</span>
        <button style={{ fontSize: '12px', color: '#4318ff', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Plus size={14} /> Add New
        </button>
      </div>
      
      <div className={styles.calendarHeader}>
        <button className={styles.iconBtn} onClick={prevMonth}><ChevronLeft size={16} /></button>
        <span style={{ minWidth: '120px', textAlign: 'center' }}>{monthNames[month]} {year}</span>
        <button className={styles.iconBtn} onClick={nextMonth}><ChevronRight size={16} /></button>
      </div>

      <div className={styles.calendarGrid}>
        {days.map(d => <div key={d} className={styles.dayName}>{d}</div>)}
        {dates.map((date, idx) => (
          <div key={idx} className={`${styles.calendarDay} ${date && isToday(date) ? styles.active : ''}`} style={!date ? {cursor: 'default'} : {}}>
            {date || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Admin Dashboard</h1>
        <div className={styles.breadcrumbs}>Dashboard / Admin Dashboard</div>
      </div>

      {/* Stats Row */}
      <div className={styles.statsRow}>
        <StatCard 
          icon={GraduationCap} 
          label="Total Students" 
          value="0" 
          active="0" 
          inactive="0" 
          iconBg="#ffeaea" 
          iconColor="#ff5b5b" 
        />
        <StatCard 
          icon={Users} 
          label="Total Teachers" 
          value="0" 
          active="0" 
          inactive="0" 
          iconBg="#e6f7ff" 
          iconColor="#0bb783" 
        />
        <StatCard 
          icon={Presentation} 
          label="Total Classes" 
          value="0" 
          active={undefined} 
          inactive={undefined} 
          iconBg="#fff8dd" 
          iconColor="#ffc107" 
        />
      </div>

      {/* Main Grid: Quick Links | Financials | Schedule */}
      <div className={styles.mainGrid}>
        
        {/* Col 1: Quick Links */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>Quick Links</div>
          <div className={styles.quickLinksGrid}>
            <QuickLink icon={Calendar} label="Calendar" color="#0bb783" bg="#e6f7ff" />
            <QuickLink icon={ClipboardList} label="Exam Result" color="#5d78ff" bg="#eeeffd" />
            <QuickLink icon={UserCheck} label="Attendance" color="#ffc107" bg="#fff8dd" />
            <QuickLink icon={Receipt} label="Fees" color="#3699ff" bg="#e1f0ff" />
            <QuickLink icon={BookOpen} label="Home Works" color="#fd397a" bg="#ffe2e5" />
            <QuickLink icon={FileText} label="Reports" color="#00bcd4" bg="#e0f7fa" />
          </div>
        </div>

        {/* Col 2: Financials */}
        <div className={styles.financialColumn}>
          <div className={styles.financialCard}>
            <div className={styles.financialLabel}>Total Earnings</div>
            <div className={styles.financialValue}>$64,522,24</div>
          </div>
          <div className={styles.financialCard}>
            <div className={styles.financialLabel}>Total Expenses</div>
            <div className={styles.financialValue}>$60,522,24</div>
          </div>
        </div>

        {/* Col 3: Schedules */}
        <CalendarWidget />

      </div>

    </div>
  );
};

export default DashboardPage;

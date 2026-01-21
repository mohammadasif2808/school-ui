import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

// Features - Dashboard
import DashboardPage from './features/dashboard/pages/DashboardPage';

// Features - Auth
import LoginPage from './features/auth/pages/LoginPage';
import ProfilePage from './features/auth/pages/ProfilePage';

// Features - Front Office
import VisitorsLogPage from './features/front-office/pages/VisitorsLogPage';
import AddVisitorPage from './features/front-office/pages/AddVisitorPage';
import PhoneCallLogPage from './features/front-office/pages/PhoneCallLogPage';
import HalfDayNoticesPage from './features/front-office/pages/HalfDayNoticesPage';
import PostalLogPage from './features/front-office/pages/PostalLogPage';
import AdmissionEnquiryPage from './features/front-office/pages/AdmissionEnquiryPage';
import AddAdmissionEnquiryPage from './features/front-office/pages/AddAdmissionEnquiryPage';
import ComplaintsPage from './features/front-office/pages/ComplaintsPage';
import FrontOfficeSetupPage from './features/front-office/pages/FrontOfficeSetupPage';

// Features - Peoples
import StudentsPage from './features/peoples/pages/StudentsPage';
import AddStudentPage from './features/peoples/pages/AddStudentPage';
import ParentsPage from './features/peoples/pages/ParentsPage';
import StaffPage from './features/peoples/pages/StaffPage';
import AddStaffPage from './features/peoples/pages/AddStaffPage';
import PromoteStudentPage from './features/peoples/pages/PromoteStudentPage';
import RollNumbersPage from './features/peoples/pages/RollNumbersPage';

import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              
              {/* Front Office Routes */}
              <Route path="front-office">
                <Route path="visitors" element={<VisitorsLogPage />} />
                <Route path="visitors/add" element={<AddVisitorPage />} />
                <Route path="phone-calls" element={<PhoneCallLogPage />} />
                <Route path="half-day" element={<HalfDayNoticesPage />} />
                <Route path="postal" element={<PostalLogPage />} />
                <Route path="admission-enquiries">
                  <Route index element={<AdmissionEnquiryPage />} />
                  <Route path="add" element={<AddAdmissionEnquiryPage />} />
                </Route>
                <Route path="complaints" element={<ComplaintsPage />} />
                <Route path="setup" element={<FrontOfficeSetupPage />} />
              </Route>

              {/* Peoples Routes */}
              <Route path="students">
                <Route index element={<StudentsPage />} />
                <Route path="create" element={<AddStudentPage />} />
              </Route>
              <Route path="parents" element={<ParentsPage />} />
              <Route path="staff">
                <Route index element={<StaffPage />} />
                <Route path="add" element={<AddStaffPage />} />
              </Route>
              <Route path="promote-student" element={<PromoteStudentPage />} />
              <Route path="roll-numbers" element={<RollNumbersPage />} />
              
              <Route path="courses" element={<div className="card"><h3>Courses Module</h3><p>Content coming soon...</p></div>} />
              <Route path="settings" element={<div className="card"><h3>Settings</h3><p>Manage your preferences here.</p></div>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
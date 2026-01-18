import React, { useEffect, useState } from 'react';
import { User as UserIcon, Lock, Shield, Save, KeyRound, CheckCircle, AlertCircle, Camera, Mail, Phone, MapPin } from 'lucide-react';
import styles from './ProfilePage.module.css';

// Services & Types
import { authService } from '../authService';
import { User } from '../../../types';

// Standardized UI Components
import PageHeader from '../../../components/ui/PageHeader';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'permissions'>('profile');
  
  // Profile Form State
  const [profileData, setProfileData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    address: '123, Education Lane, Knowledge City' // Mock address as it's not in User type yet
  });

  // Reset Password State
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userData = await authService.getProfile();
        setUser(userData);
        setProfileData(prev => ({
          ...prev,
          fullName: userData.name || `${userData.first_name} ${userData.last_name}`,
          username: userData.username,
          email: userData.email,
          phone: userData.phone || ''
        }));
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update Profile:', profileData);
    // Call API to update profile
  };

  const handleResetPassword = async () => {
    if (!profileData.email) {
      setResetError("No email address found for this user.");
      return;
    }

    try {
      setResetLoading(true);
      setResetError(null);
      setResetSuccess(null);
      
      await authService.forgotPassword({ email: profileData.email });
      setResetSuccess(`Password reset link has been sent to ${profileData.email}`);
    } catch (error: any) {
      setResetError(error.message || "Failed to send reset link.");
    } finally {
      setResetLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading Profile...</p>
      </div>
    );
  }

  if (!user) {
    return <div className={styles.errorContainer}>Failed to load profile.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <PageHeader 
        title="My Profile" 
        breadcrumbs="Dashboard / Profile" 
      />

      <div className={styles.layoutGrid}>
        {/* Left Sidebar - User Card & Navigation */}
        <div className={styles.leftColumn}>
          <Card className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarWrapper}>
                <img 
                  src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random&color=fff&bold=true`} 
                  alt="Profile" 
                  className={styles.avatar} 
                />
                <button className={styles.editAvatarBtn} title="Change Avatar">
                  <Camera size={14} />
                </button>
              </div>
              <h2 className={styles.userName}>{user.first_name} {user.last_name}</h2>
              <span className={styles.userRole}>{user.role}</span>
              <div className={styles.userStatus}>
                 <span className={styles.statusDot}></span> Active
              </div>
            </div>

            <div className={styles.navMenu}>
              <button 
                className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <UserIcon size={18} />
                <span>Personal Information</span>
              </button>
              <button 
                className={`${styles.navItem} ${activeTab === 'security' ? styles.active : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Lock size={18} />
                <span>Security & Password</span>
              </button>
              <button 
                className={`${styles.navItem} ${activeTab === 'permissions' ? styles.active : ''}`}
                onClick={() => setActiveTab('permissions')}
              >
                <Shield size={18} />
                <span>Permissions</span>
              </button>
            </div>
          </Card>

          {/* <Card className={styles.contactCard}>
             <h3 className={styles.contactTitle}>Contact Info</h3>
             <div className={styles.contactList}>
                <div className={styles.contactItem}>
                   <div className={styles.contactIcon}><Mail size={16} /></div>
                   <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>Email</span>
                      <span className={styles.contactValue}>{profileData.email}</span>
                   </div>
                </div>
                <div className={styles.contactItem}>
                   <div className={styles.contactIcon}><Phone size={16} /></div>
                   <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>Phone</span>
                      <span className={styles.contactValue}>{profileData.phone || 'Not set'}</span>
                   </div>
                </div>
             </div>
          </Card> */}
        </div>

        {/* Right Content Area */}
        <div className={styles.rightColumn}>
          {activeTab === 'profile' && (
            <Card title="Personal Information" headerActions={<Button size="sm" icon={<Save size={16}/>}>Save Changes</Button>}>
              <form onSubmit={handleProfileUpdate} className={styles.contentForm}>
                <div className={styles.formGrid}>
                  <Input 
                    label="Full Name" 
                    name="fullName"
                    value={profileData.fullName} 
                    onChange={handleProfileChange}
                    icon={<UserIcon size={16} />}
                  />
                   <Input 
                    label="Username" 
                    name="username"
                    value={profileData.username} 
                    onChange={handleProfileChange}
                    disabled
                    icon={<UserIcon size={16} />}
                  />
                  <Input 
                    label="Email Address" 
                    name="email"
                    type="email"
                    value={profileData.email} 
                    onChange={handleProfileChange}
                    icon={<Mail size={16} />}
                  />
                  <Input 
                    label="Phone Number" 
                    name="phone"
                    type="tel"
                    value={profileData.phone} 
                    onChange={handleProfileChange}
                    icon={<Phone size={16} />}
                  />
                  <div className={styles.fullWidth}>
                    <Input 
                        label="Address" 
                        name="address"
                        value={profileData.address} 
                        onChange={handleProfileChange}
                        icon={<MapPin size={16} />}
                    />
                  </div>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'security' && (
             <Card title="Security Settings">
               <div className={styles.securitySection}>
                  <div className={styles.securityHeader}>
                      <div className={styles.securityIconBox}>
                          <KeyRound size={24} className="text-blue-600" />
                      </div>
                      <div>
                          <h3 className={styles.securityTitle}>Password Reset</h3>
                          <p className={styles.securityDesc}>
                            Securely reset your password via email. You will receive a link to create a new password.
                          </p>
                      </div>
                  </div>

                  <div className={styles.resetBox}>
                     {resetSuccess && (
                        <div className={`${styles.alert} ${styles.alertSuccess}`}>
                            <CheckCircle size={18} />
                            <span>{resetSuccess}</span>
                        </div>
                        )}

                        {resetError && (
                        <div className={`${styles.alert} ${styles.alertError}`}>
                            <AlertCircle size={18} />
                            <span>{resetError}</span>
                        </div>
                        )}

                        <div className={styles.resetActions}>
                            <p className={styles.emailDisplay}>Send link to: <strong>{profileData.email}</strong></p>
                            <Button 
                                type="button" 
                                onClick={handleResetPassword}
                                disabled={resetLoading}
                                icon={resetLoading ? undefined : <Lock size={16} />}
                            >
                                {resetLoading ? 'Sending Link...' : 'Send Reset Link'}
                            </Button>
                        </div>
                  </div>
               </div>
             </Card>
          )}

          {activeTab === 'permissions' && (
            <Card title="My Permissions & Roles">
                <div className={styles.roleSection}>
                    <h3 className={styles.sectionTitle}>Assigned Role</h3>
                    <div className={styles.roleBadge}>{user.role}</div>
                </div>
                
                <div className={styles.permissionsSection}>
                    <h3 className={styles.sectionTitle}>System Permissions</h3>
                    <div className={styles.permissionsList}>
                    {user.permissions && user.permissions.length > 0 ? (
                        user.permissions.map((perm, index) => (
                        <div key={index} className={styles.permissionItem}>
                            <div className={styles.permCheck}><CheckCircle size={12} /></div>
                            <span>{perm}</span>
                        </div>
                        ))
                    ) : (
                        <span className="text-gray-500">No specific permissions assigned.</span>
                    )}
                    </div>
                </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

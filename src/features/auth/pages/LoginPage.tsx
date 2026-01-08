import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('DEV0001');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Using login function from context
    // Note: The context login expects email, but we'll pass username for now
    // as per the new UI. In a real app, service would handle this.
    const result = await login(username, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <div style={{ backgroundColor: '#556ee6', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 16, height: 16, border: '2px solid white', borderRadius: 2 }}></div>
        </div>
        <span className={styles.logoText}>MySchool</span>
      </div>

      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome</h2>
        <p className={styles.subtitle}>Please enter your details to sign in</p>
        
        {error && <div style={{ color: '#ef4444', marginBottom: 16, fontSize: 14 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <label className={styles.checkboxGroup}>
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a href="#" className={styles.forgotLink}>Forgot Password??</a>
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>

      <footer className={styles.footer}>
        Copyright © 2025 - sfsoftware
      </footer>
    </div>
  );
};

export default LoginPage;

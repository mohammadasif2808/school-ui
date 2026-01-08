import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  multiline?: boolean;
  rows?: number;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  required, 
  error, 
  helpText, 
  multiline = false,
  className = '',
  id,
  icon,
  ...props 
}) => {
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {multiline ? (
          <textarea
            id={inputId}
            className={`${styles.input} ${styles.textarea} ${error ? styles.errorBorder : ''} ${icon ? styles.withIcon : ''}`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={inputId}
            className={`${styles.input} ${error ? styles.errorBorder : ''} ${icon ? styles.withIcon : ''}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
      
      {error && <span className={styles.errorText}>{error}</span>}
      {helpText && !error && <span className={styles.helpText}>{helpText}</span>}
    </div>
  );
};

export default Input;

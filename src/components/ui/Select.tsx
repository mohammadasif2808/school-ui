import React from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  helpText?: string;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  required, 
  error, 
  helpText, 
  className = '',
  id,
  ...props 
}) => {
  const selectId = id || `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`${styles.selectContainer} ${className}`}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.wrapper}>
        <select
          id={selectId}
          className={`${styles.select} ${error ? styles.errorBorder : ''}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && <span className={styles.errorText}>{error}</span>}
      {helpText && !error && <span className={styles.helpText}>{helpText}</span>}
    </div>
  );
};

export default Select;

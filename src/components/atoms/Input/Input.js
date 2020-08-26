import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({ name, label, placeholder, onChange, value, isActive, children }) => (
  <div className={styles.formItem}>
    <input
      autoComplete="off"
      className={styles.input}
      type="text"
      value={value}
      name={name}
      id={name}
      required
      placeholder={placeholder}
      onChange={onChange}
    />
    {children}
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
    <div className={styles.formItemBar} />
  </div>
);

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.node,
};
Input.defaultProps = {
  name: '',
  label: '',
  placeholder: '',
  onChange: null,
  isActive: false,
  children: null,
};

export default Input;

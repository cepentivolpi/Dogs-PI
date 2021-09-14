import React from "react";
import styles from "./FormItem.module.css"



export default function FormItem({ label, type, name, value, handleChange, error }) {
  return (
    <div className={styles.form}>
      <h4 className={styles.label}>{label}</h4>
      {name === "name" ? <input className={styles.inputBreed} type={type} name={name} aria-label={name} value={value} onChange={handleChange} /> : <input className={styles.input} type={type} name={name} aria-label={name} value={value} onChange={handleChange} />}

      <span className={styles.error}>{error}</span>
    </div>
  );
}
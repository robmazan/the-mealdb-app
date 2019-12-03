import React from "react";
import styles from "./Center.module.css";

const Center: React.FC = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Center;

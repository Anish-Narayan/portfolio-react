import React from 'react';
import Navbar from './Navbar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <main className={styles.mainContent}>
        {children}
      </main>
      {/* You could add a Footer component here */}
    </>
  );
};

export default Layout;
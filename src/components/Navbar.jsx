// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- THEME LOGIC: Default to Dark Mode ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Only start in Light mode if user explicitly saved 'light'
    if (savedTheme === 'light') return false;
    // Otherwise (first visit or saved 'dark'), default to True
    return true; 
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.remove('light');
      html.classList.add('dark'); // Optional, for Tailwind compatibility
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/experience', label: 'Experience' },
    { to: '/skills', label: 'Skills' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.bracket}>[</span> AN <span className={styles.bracket}>]</span>
        </NavLink>

        {/* Desktop Links */}
        <div className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              <span className={styles.linkText}>{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Right Side: Theme Toggle & Mobile Burger */}
        <div className={styles.controls}>
          <button onClick={toggleDarkMode} className={styles.themeToggle} aria-label="Toggle Theme">
            {isDarkMode ? (
              <SunIcon className={styles.icon} />
            ) : (
              <MoonIcon className={styles.icon} />
            )}
          </button>

          <button onClick={toggleMobileMenu} className={styles.mobileToggle} aria-label="Open Menu">
            {isMobileMenuOpen ? (
              <XMarkIcon className={styles.icon} />
            ) : (
              <Bars3Icon className={styles.icon} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              isActive ? `${styles.mobileLink} ${styles.active}` : styles.mobileLink
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
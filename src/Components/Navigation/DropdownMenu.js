import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import styles from './DropdownMenu.module.css'; // Import the CSS Module

const DropdownMenu = () => {
  return (
    <nav role="navigation" className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/" className={styles.navLink} activeClassName={styles.active}>Home</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/cakes" className={styles.navLink} activeClassName={styles.active}>Torták</NavLink>
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <NavLink to="/web-development" className={styles.dropdownLink} activeClassName={styles.active}>Web Development</NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink to="/web-design" className={styles.dropdownLink} activeClassName={styles.active}>Web Design</NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink to="/illustration" className={styles.dropdownLink} activeClassName={styles.active}>Illustration</NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink to="/iconography" className={styles.dropdownLink} activeClassName={styles.active}>Iconography</NavLink>
            </li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/about" className={styles.navLink} activeClassName={styles.active}>About</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/contact" className={styles.navLink} activeClassName={styles.active}>Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DropdownMenu;

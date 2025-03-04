import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import styles from './DropdownMenu.module.css'; // Import the CSS Module

const DropdownMenu = () => {
  return (
    <nav role="navigation" className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/" className={styles.navLink} activeClassName={styles.active}>Torták</NavLink>
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <NavLink to="/web-development" className={styles.dropdownLink} activeClassName={styles.active}>Klasszikus torák</NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink to="/web-design" className={styles.dropdownLink} activeClassName={styles.active}>Burkolt torák</NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink to="/illustration" className={styles.dropdownLink} activeClassName={styles.active}>Linzertorták</NavLink>
            </li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/cakes" className={styles.navLink} activeClassName={styles.active}>Macaronok</NavLink>

        </li>
        <li className={styles.navItem}>
          <NavLink to="/about" className={styles.navLink} activeClassName={styles.active}>Sütemények</NavLink>
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <NavLink to="/web-development" className={styles.dropdownLink} activeClassName={styles.active}>Klasszikus sütemények</NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink to="/web-design" className={styles.dropdownLink} activeClassName={styles.active}>Mentes sütemények</NavLink>
            </li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/contact" className={styles.navLink} activeClassName={styles.active}>Fondant figurák</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/contact" className={styles.navLink} activeClassName={styles.active}>Kapcsolat</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DropdownMenu;

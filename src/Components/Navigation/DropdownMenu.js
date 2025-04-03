import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DropdownMenu.module.css';
import CartContext from '../Store/cart-context';

const DropdownMenu = ({ menuVisible }) => {
  const cartCtx = useContext(CartContext);

  const handleScroll = (category) => {
    cartCtx.setScrollToCategory(category);
  };

  const handleMenuClick = () => {
    cartCtx.setGalleryIsOpen(false);  // Bezárjuk a galleryContainer-t
  };

  // Only apply color changes to main navigation items
  const navLinkClasses = `${styles.navLink} ${menuVisible ? styles.whiteText : styles.blackText}`;

  return (
    <nav role="navigation" className={styles.nav}>
      <ul className={styles.navList} onClick={handleMenuClick}>
        <li className={styles.navItem}>
          <NavLink 
            to="/" 
            className={navLinkClasses}
            activeClassName={styles.active}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('KlasszikusTortak');
            }}
          >
            Torták
          </NavLink>
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <NavLink 
                to="/Klasszikus-tortak" 
                className={styles.dropdownLink}
                activeClassName={styles.active}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('KlasszikusTortak');
                }}
              >
                Klasszikus torták
              </NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink 
                to="/kulonleges-tortak" 
                className={styles.dropdownLink}
                activeClassName={styles.active}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('KulonlegesTortak');
                }}
              >
                Különleges torták
              </NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink 
                to="/burkolt-tortak" 
                className={styles.dropdownLink}
                activeClassName={styles.active}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('BurkoltTortak');
                }}
              >
                Burkolt torták
              </NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink 
                to="/linzertortak" 
                className={styles.dropdownLink}
                activeClassName={styles.active}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('Linzertortak');
                }}
              >
                Linzertorták
              </NavLink>
            </li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/macaronok" 
            className={navLinkClasses}
            activeClassName={styles.active}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('Macaronok');
            }}
          >
            Macaronok
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/sutemenyek" 
            className={navLinkClasses}
            activeClassName={styles.active}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('KlasszikusSutemenyek');
            }}
          >
            Sütemények
          </NavLink>
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <NavLink 
                to="/klasszikus-sutemenyek" 
                className={styles.dropdownLink}
                activeClassName={styles.active}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('KlasszikusSutemenyek');
                }}
              >
                Klasszikus sütemények
              </NavLink>
            </li>
            <li className={styles.dropdownItem}>
              <NavLink 
                to="/mentes-sutemenyek" 
                className={styles.dropdownLink}
                activeClassName={styles.active}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('MentesSutemenyek');
                }}
              >
                Mentes sütemények
              </NavLink>
            </li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <NavLink 
            to="/fondant-figurak" 
            className={navLinkClasses}
            activeClassName={styles.active}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('FondantFigurak');
            }}
          >
            Fondant figurák
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DropdownMenu;

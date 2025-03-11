import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DropdownMenu.module.css';
import CartContext from '../Store/cart-context';

const DropdownMenu = () => {
  const cartCtx = useContext(CartContext);

  const handleScroll = (category) => {
    cartCtx.setScrollToCategory(category);
  };

  const handleMenuClick = () => {
    cartCtx.setGalleryIsOpen(false);  // Bezárjuk a galleryContainer-t
  };

  return (
    <nav role="navigation" className={styles.nav}>
      <ul className={styles.navList} onClick={handleMenuClick}>
        <li className={styles.navItem}>
          <NavLink 
            to="/" 
            className={styles.navLink} 
            activeClassName={styles.active}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('HagyomanyosTortak');
            }}
          >
            Torták
          </NavLink>
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <NavLink 
                to="/hagyomanyos-tortak" 
                className={styles.dropdownLink} 
                activeClassName={styles.active}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('HagyomanyosTortak');
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
            className={styles.navLink} 
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
            className={styles.navLink} 
            activeClassName={styles.active}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('HagyomanyosSutemenyek');
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
                  handleScroll('HagyomanyosSutemenyek');
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
            className={styles.navLink} 
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

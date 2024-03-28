import React, { useState, useContext } from 'react';
import styles from './CurtainMenu.module.css';
import CartContext from "../Store/cart-context";

const CurtainMenu = () => {


  const cartCtx = useContext(CartContext);

  const openNav = () => {
    cartCtx.setMenuIsOpen(true);
  };

  const closeNav = () => {
    cartCtx.setMenuIsOpen(false);
  };

  console.log(cartCtx.menuIsOpen)

 
  return (
    <div>
      {cartCtx.menuIsOpen && (
        <div id="myNav" className={styles.overlay}>
          <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>
            &times;
          </a>
          <div className={styles.overlayContent}>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
          </div>
        </div>
      )}
      <span onClick={openNav}>open</span>
    </div>
  );
};

export default CurtainMenu;

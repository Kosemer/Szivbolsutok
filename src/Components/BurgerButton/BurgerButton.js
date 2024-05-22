import React, { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context";
import "./BurgerButton.css";

function BurgerButton() {
  const cartCtx = useContext(CartContext);

  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");

  useEffect(() => {
    if (cartCtx.galleryIsOpen || cartCtx.menuIsOpen) {
      setBurgerClass("burger-bar clicked");
    } else {
      setBurgerClass("burger-bar unclicked");
    }
  }, [cartCtx.galleryIsOpen, cartCtx.menuIsOpen]);

  const handleClick = () => {
    if (cartCtx.galleryIsOpen) {
      cartCtx.setGalleryIsOpen(false);
    } else {
      cartCtx.setMenuIsOpen(!cartCtx.menuIsOpen);
    }
  };

  return (
    <Fragment>
      <div className="burger-menu" onClick={handleClick}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
    </Fragment>
  );
}

export default BurgerButton;

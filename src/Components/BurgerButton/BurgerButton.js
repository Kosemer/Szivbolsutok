import React, { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context";
import "./BurgerButton.css";

function BurgerButton() {
  const cartCtx = useContext(CartContext);
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ha az oldal tetejétől való távolság nagyobb mint 50px, akkor scrolled állapot
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Kezdeti állapot beállítása
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (cartCtx.galleryIsOpen || cartCtx.menuIsOpen) {
      setBurgerClass("burger-bar clicked");
    } else {
      setBurgerClass(`burger-bar unclicked ${isScrolled ? "scrolled" : ""}`);
    }
  }, [cartCtx.galleryIsOpen, cartCtx.menuIsOpen, isScrolled]);

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

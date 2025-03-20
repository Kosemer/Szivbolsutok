import React, { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context";
import "./BurgerButton.css";

function BurgerButton() {
  const cartCtx = useContext(CartContext);
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [isScrolled, setIsScrolled] = useState(false);
  const [burgerColor, setBurgerColor] = useState("white");
  const [menuAnimationClass, setMenuAnimationClass] = useState(""); // ÚJ

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
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

    // Ha nincs görgetés, a gomb legyen fehér
    setBurgerColor(isScrolled ? "#473939" : "white");

    // Ha a menü nyitva van, hozzáadja az animációs osztályt
    setMenuAnimationClass(cartCtx.menuIsOpen ? "swing-menu" : "");

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
      <div className={`burger-menu ${menuAnimationClass}`} onClick={handleClick}>
        <div className={burgerClass} style={{ backgroundColor: burgerColor }}></div>
        <div className={burgerClass} style={{ backgroundColor: burgerColor }}></div>
        <div className={burgerClass} style={{ backgroundColor: burgerColor }}></div>
      </div>
    </Fragment>
  );
}

export default BurgerButton;

/* "Vissza az oldal tetejére" gombot hoz létre, amely megjelenik, amikor a felhasználó lefelé görget az oldalon. A gomb láthatóságát a böngésző ablak pozíciójához viszonyítva állítja be: ha a pozíció nagyobb, mint 300px, a gomb láthatóvá válik, különben rejtett.

A gombra kattintva a felhasználó visszakerül az oldal tetejére, a gördülés sima, adott időtartamú (jelen esetben 500 ms) animációval. Az animáció lépései és időintervallumai a gördülési időtartam alapján vannak kiszámítva.

A komponens "useEffect" hook-ot használ a gördülés eseményfigyelő hozzáadására és eltávolítására az oldal betöltésekor és eltűnésekor. */

import React, { useState, useEffect, useContext } from "react";
import styles from "./ScrollToTopButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../Store/cart-context";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300 && !cartCtx.galleryIsOpen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [cartCtx.galleryIsOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonClass = isVisible ? styles.fadeIn : styles.fadeOut;

  if (cartCtx.galleryIsOpen) {
    return null;
  }

  return (
    <div className={styles.scrollToTop}>
      <button
        onClick={scrollToTop}
        className={`${styles.scrollToTopButton} ${buttonClass}`}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </div>
  );
};

export default ScrollToTopButton;

/* "Vissza az oldal tetejére" gombot hoz létre, amely megjelenik, amikor a felhasználó lefelé görget az oldalon. A gomb láthatóságát a böngésző ablak pozíciójához viszonyítva állítja be: ha a pozíció nagyobb, mint 300px, a gomb láthatóvá válik, különben rejtett.

A gombra kattintva a felhasználó visszakerül az oldal tetejére, a gördülés sima, adott időtartamú (jelen esetben 500 ms) animációval. Az animáció lépései és időintervallumai a gördülési időtartam alapján vannak kiszámítva.

A komponens "useEffect" hook-ot használ a gördülés eseményfigyelő hozzáadására és eltávolítására az oldal betöltésekor és eltűnésekor. */

import React, { useState, useEffect } from "react";
import styles from "./ScrollToTopButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Figyeljük a felhasználó görgetését, hogy megjelenítsük vagy elrejtsük a gombot
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Takarítsunk fel a komponens elbontása után
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Görgetés a lap tetejére
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Gördülékeny görgetés
    });
  };

  const buttonClass = isVisible ? styles.fadeIn : styles.fadeOut;

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

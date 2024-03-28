/* A navigációs menüt és a logót tartalmazza. A komponens reagál a böngésző ablak görgetésére: ha a felhasználó görget, a fejléc eltűnik, ha visszagörget, a fejléc újra megjelenik. Ez a funkció a useEffect és useState horgok használatával van implementálva.

Figyelembe veszi a mobil nézet állapotát a cssMobile változó segítségével, amit a CartContext-ból szerez meg. Ha a nézet mobil, a fejléc stílusa változik, és a moblieMenuChange funkcióval lehet megváltoztatni ezt az állapotot. */

import { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import BurgerButton from "../BurgerButton/BurgerButton";
import CartContext from "../Store/cart-context";
import Logo from "../../Assets/Logo/LogoHeaderNoBackground.png";
import instagram from "../../Assets/SocialIcon/instagram.svg";
import facebook from "../../Assets/SocialIcon/facebook.svg";
import NewNavbar from "./NewNavbar";

function Header() {
  const cartCtx = useContext(CartContext);

  const cssMobile = cartCtx.cssMobile;
  const setCssMobile = cartCtx.setCssMobile;

  /*Menü eltüntetése görgetéskor*/

  const [menuVisible, setMenuVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setMenuVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const moblieMenuChange = () => {
    setCssMobile(!cartCtx.cssMobile);
  };

  //MOBILNÉZETBEN KOMPONENSEK ELTÜNTETÉSE

  const headerClasses = `${classes.header} ${
    menuVisible ? "" : classes.hidden
  } ${cssMobile ? classes.active : ""}`;

  return (
    <Fragment>
<NewNavbar></NewNavbar>
    </Fragment>
  );
}

export default Header;

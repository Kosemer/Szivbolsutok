/* A navigációs menüt és a logót tartalmazza. A komponens reagál a böngésző ablak görgetésére: ha a felhasználó görget, a fejléc eltűnik, ha visszagörget, a fejléc újra megjelenik. Ez a funkció a useEffect és useState horgok használatával van implementálva.

Figyelembe veszi a mobil nézet állapotát a cssMobile változó segítségével, amit a CartContext-ból szerez meg. Ha a nézet mobil, a fejléc stílusa változik, és a moblieMenuChange funkcióval lehet megváltoztatni ezt az állapotot. */

import { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import BurgerButton from "../BurgerButton/BurgerButton";
import CartContext from "../Store/cart-context";
import Logo from "../../Assets/AccordionPictureBox/szivbolLogo2.png";
import instagram from "../../Assets/SocialIcon/instagram.svg";
import facebook from "../../Assets/SocialIcon/facebook.svg";
import CurtainMenu from "./CurtainMenu";
import CurtainMenuWithLink from "./CurtainMenuWithLink";
import mainTitle from "../../Assets/CakesPicture/mainTitle.png"

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
      const shouldShowMenu = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setMenuVisible(shouldShowMenu && currentScrollPos === 0);
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

  const mainTitleClasses = `${classes.mainTitle} ${
    menuVisible ? "" : classes.mainTitleHidden
  } ${cssMobile ? classes.active : ""}`;
  

  return (
    <Fragment>
      {
        <header className={headerClasses}>
          <NavLink to="/" className={classes.linkText}>
            <div className={classes.headerTitle}>
          <img src={mainTitle} alt="Fruit Cake" className={mainTitleClasses} />
          </div>
            {/*<h1 className={classes.title}>Szívből sütök</h1>*/}
          </NavLink>

          {/*<div className={classes.logoContainer}>
            <NavLink to="/" className={classes.logoLink}>
              <img src={Logo} className={classes.logo} alt="logo"></img>
            </NavLink>
          </div>*/}
          <CurtainMenu menuVisible={menuVisible}></CurtainMenu>
          <div className={classes.burgerButton}>
          <BurgerButton></BurgerButton>
          </div>
          
          {/*<CurtainMenuWithLink></CurtainMenuWithLink>*/}
        </header>
      }
    </Fragment>
  );
}

export default Header;

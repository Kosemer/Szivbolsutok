/* A navigációs menüt és a logót tartalmazza. A komponens reagál a böngésző ablak görgetésére: ha a felhasználó görget, a fejléc eltűnik, ha visszagörget, a fejléc újra megjelenik. Ez a funkció a useEffect és useState horgok használatával van implementálva.

Figyelembe veszi a mobil nézet állapotát a cssMobile változó segítségével, amit a CartContext-ból szerez meg. Ha a nézet mobil, a fejléc stílusa változik, és a moblieMenuChange funkcióval lehet megváltoztatni ezt az állapotot. */

import { Fragment, useContext, useEffect, useState } from "react";
import { NavLink,useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import BurgerButton from "../BurgerButton/BurgerButton";
import CartContext from "../Store/cart-context";
import Logo from "../../Assets/AccordionPictureBox/szivbolLogo2.png";
import instagram from "../../Assets/SocialIcon/instagram.svg";
import facebook from "../../Assets/SocialIcon/facebook.svg";
import CurtainMenu from "./CurtainMenu";
import CurtainMenuWithLink from "./CurtainMenuWithLink";
import SzvbolSutokLogoBlack from "../../Assets/CakesPicture/mainTitle3.png";
import SzvbolSutokLogoWhite from "../../Assets/CakesPicture/SzvbolSutokLogoWhite.png";
import DropdownMenu from "../Navigation/DropdownMenu";

const Header = ({ showCloseButton }) => {
  const cartCtx = useContext(CartContext);
  

  const cssMobile = cartCtx.cssMobile;
  const setCssMobile = cartCtx.setCssMobile;
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Ez biztosítja a sima görgetési animációt
    });
  };

  /*Menü eltüntetése görgetéskor*/

  const [menuVisible, setMenuVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 920);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const shouldShowMenu = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setMenuVisible(shouldShowMenu && currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 920);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
  
  // Determine which logo to use based on menu visibility
  const currentLogo = menuVisible ? SzvbolSutokLogoWhite : SzvbolSutokLogoBlack;

  const handleHeaderTitleClick = () => {
    if (cartCtx.galleryIsOpen) {
      cartCtx.setGalleryIsOpen(false);
    }
    scrollToTop();
  };

  const handleCloseGallery = () => {
    cartCtx.setGalleryIsOpen(false);
  };

  const location = useLocation();



  if (location.pathname === '/login') {

    return null;

  }

  return (
    <Fragment>
      {
        <header className={headerClasses}>
            <div 
              className={classes.headerTitle} 
              onClick={handleHeaderTitleClick}
            >
              <img src={currentLogo} alt="Szívből sütök logo" className={mainTitleClasses} />
            </div>
            {/*<h1 className={classes.title}>Szívből sütök</h1>*/}

            {/*<div className={classes.logoContainer}>
              <NavLink to="/" className={classes.logoLink}>
                <img src={Logo} className={classes.logo} alt="logo"></img>
              </NavLink>
            </div>*/}
            <CurtainMenu menuVisible={menuVisible}></CurtainMenu>
            <div className={classes.burgerButton}>
            {isMobileView ? (
            <div className={classes.burgerButton}>
              <BurgerButton />
            </div>
          ) : (
            <div className={classes.dropdownMenu}>
              <DropdownMenu menuVisible={menuVisible} />
            </div>
          )}
            </div>
            
            {/*<CurtainMenuWithLink></CurtainMenuWithLink>*/}
            {showCloseButton && cartCtx.galleryIsOpen && (
              <button 
                className={classes.closeButton}
                onClick={handleCloseGallery}
                aria-label="Galéria bezárása"
              >
                ✕
              </button>
            )}
          </header>
      }
    </Fragment>
  );
}

export default Header;

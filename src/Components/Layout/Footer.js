/* Három fő részből áll: elérhetőségek, fotó szolgáltatások és a weboldal navigációs linkek.

Az elérhetőségek szakasz tartalmazza a kapcsolattartási adatokat, mint például e-mail cím és telefon szám, valamint linkeket az Instagram és Facebook oldalakhoz. Ezekre a linkekre kattintva új böngésző ablakban nyílnak meg az oldalak.

A fotó szolgáltatások szakasz linkeket tartalmaz a különböző fotózás szolgáltatásokra, mint például portré, esküvői, boudoir, sport és családi fotózás, valamint rendezvény fotózás.

A harmadik szakaszban a weboldal oldalainak linkei találhatóak, mint például a Főoldal, Galéria, Árak, Rólam, Kapcsolat és Admin oldalak.

Az alján a lábléc tartalmaz egy szerzői jogi szöveget, amely megjeleníti az aktuális évet és egy linket a FrontWeb oldalára. Végül figyelmeztetést ad a reCAPTCHA használatára vonatkozóan, ami azt jelenti, hogy a weboldalt a Google reCAPTCHA védi. */

import React from "react";
import classes from "./Footer.module.css";
import email from "../../Assets/Icon/email.svg";
import phone from "../../Assets/Icon/phone.svg";
import instagram from "../../Assets/SocialIcon/instagram.svg";
import facebook from "../../Assets/SocialIcon/facebook.svg";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import footerLogo from "../../Assets/footerLogo/logoMenu2.png";

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [images, setImages] = useState([]);

  function handleClickInsta() {
    window.open(
      "https://www.instagram.com/szivbol_sutok/",
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handleClickFace() {
    window.open(
      "https://www.facebook.com/fruzsika88",
      "_blank",
      "noopener,noreferrer"
    );
  }

  /*Images load*/
  useEffect(() => {
    const fetchImages = async () => {
      const imagesData = await Promise.all([
        fetchImagesFromFolder("InstagramBox"),
      ]);

      const combinedImages = imagesData.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      setImages(combinedImages);
    };

    fetchImages();
  }, []);

  const fetchImagesFromFolder = async (folder) => {
    try {
      const imageData = await ImageDimensions(folder);
      return imageData.slice(0, 4);
    } catch (error) {
      console.error("Hiba a képek lekérése közben", error);
      return [];
    }
  };

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.photoServices}>
          <h2 className={classes.h2Title}>Torták és sütemények</h2>
          <div className={classes.links}>
            <div className={classes.linkBox}>
              <div className={classes.verticalLine}>
                <div className={classes.linkContainer}>
                  <NavLink to="/arak" className={classes.linkText}>
                    Hagyományos torták
                  </NavLink>
                </div>
                <div className={classes.linkContainer}>
                  <NavLink to="/arak" className={classes.linkText}>
                    Burkolt torták
                  </NavLink>
                </div>
                <div className={classes.linkContainer}>
                  <NavLink to="/arak" className={classes.linkText}>
                    Linzertorták
                  </NavLink>
                </div>
              </div>
            </div>

            <div className={classes.linkBox}>
              <div className={classes.verticalLine}>
                <div className={classes.linkContainer}>
                  <NavLink to="/arak" className={classes.linkText}>
                    Macaronok
                  </NavLink>
                </div>
                <div className={classes.linkContainer}>
                  <NavLink to="/arak" className={classes.linkText}>
                    Sütemények
                  </NavLink>
                </div>
                <div className={classes.linkContainer}>
                  <NavLink to="/arak" className={classes.linkText}>
                    Fondant figurák
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.containerContact}>
          <h2 className={classes.h2TitleLogo}>Szivből sütök</h2>

          <img
            src={footerLogo}
            alt="footerLogo"
            className={classes.footerLogo}
          />
        </div>

        <div className={classes.containerInsta}>
          <h2 className={classes.h2TitleInsta} onClick={handleClickInsta}>
            Instagram{" "}
            <img
              src={instagram}
              alt="instagram icon"
              className={classes.icon}
            />
          </h2>
          <div className={classes.imageBox} onClick={handleClickInsta}>
            {images.map((image) => (
              <div key={image.id} className={classes.box}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className={classes.underlineLong}></hr>
      <p className={classes.author}>
        © {currentYear} Szívből sütök &{" "}
        <a
          href="https://www.frontweb.hu"
          style={{
            color: "#FF69B4",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          FrontWeb
        </a>{" "}
        | Minden jog fenntartva.
      </p>
      <div className={classes.admin}>
        <NavLink to="/login" className={classes.adminText}>
          Admin
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="rgb(255, 105, 180)"
            class="bi bi-gear ms-1"
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
          </svg>
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;

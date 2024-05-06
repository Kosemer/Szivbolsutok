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
import footerLogo from "../../Assets/footerLogo/szivbolLogo.png"

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
          <h2 className={classes.h2Title}>Szivből sütök</h2>

          <img src={footerLogo} alt="footerLogo" className={classes.footerLogo} />

          
        </div>

        <div>
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
        © {currentYear} Szivbolsutok &{" "}
        <a
          href="https://www.frontweb.hu"
          style={{
            color: "#4169e1",
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
      <p className={classes.reCAPTCHA}>
        This site is protected by reCAPTCHA and the Google and Terms of Service
        apply.
      </p>
    </footer>
  );
}

export default Footer;

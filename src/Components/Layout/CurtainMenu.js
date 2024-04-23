import React, { useState, useContext, useEffect } from "react";
import styles from "./CurtainMenu.module.css";
import CartContext from "../Store/cart-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";

const CurtainMenu = () => {
  const cartCtx = useContext(CartContext);

  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [overlayClass, setOverlayClass] = useState(styles.overlay);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (cartCtx.menuIsOpen) {
      setOverlayClass(`${styles.overlay} ${styles.overlayOpen}`);
    } else {
      setOverlayClass(`${styles.overlay} ${styles.overlayClose}`);
    }
  }, [cartCtx.menuIsOpen]);

  const openNav = () => {
    cartCtx.setMenuIsOpen(true);
  };

  const closeNav = () => {
    cartCtx.setMenuIsOpen(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  /*Images load*/
  useEffect(() => {
    const fetchImages = async () => {
      const imagesData = await Promise.all([
        fetchImagesFromFolder("menuPictures"),
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
      return imageData.slice(0, 7); // Change 3 to the number of images you want to display from each folder
    } catch (error) {
      console.error("Hiba a képek lekérése közben", error);
      return [];
    }
  };
  /*Images load*/

  /*If the menu is open you cannot scroll the page*/
  useEffect(() => {
    const body = document.body;
    if (cartCtx.menuIsOpen) {
      // Ha a menü nyitva van, letiltjuk a görgetést
      body.style.overflow = "hidden";
    } else {
      // Ha a menü bezárva van, visszaállítjuk a normál állapotot
      body.style.overflow = "auto";
    }

    // Clean-up függvény, amely visszaállítja az eredeti állapotot, amikor a komponens unmountolódik
    return () => {
      body.style.overflow = "auto";
    };
  }, [cartCtx.menuIsOpen]);
  /*If the menu is open you cannot scroll the page*/

  const removeAccents = (str) => {
    return str
        .normalize("NFD") // Normalizáljuk a karaktereket Unicode formára
        .replace(/[\u0300-\u036f]/g, ""); // Kicseréljük az ékezetes karaktereket ékezet nélküli változataikra
};




  const onImageClickHandler = (image) => {
    console.log(removeAccents(image.title.split(".")[0]));

    //navigate("/galeria", { state: { filter: image.filter } });
  };

  return (
    <div>
      <div id="myNav" className={overlayClass} onClick={closeNav}>
        <div className={styles.container}>
          {images.map((image) => (
            <div
              key={image.id}
              className={styles.box}
              onClick={() => onImageClickHandler(image)}
            >
              <img src={image.src} alt={image.alt} />
              <div className={styles.text}>{image.title.split(".")[0]}</div>
            </div>
          ))}
        </div>
      </div>

      <span onClick={openNav}></span>
    </div>
  );
};

export default CurtainMenu;

import React, { useState, useContext, useEffect } from "react";
import styles from "./CurtainMenu.module.css";
import CartContext from "../Store/cart-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";

const CurtainMenu = ({ menuVisible }) => {
  const cartCtx = useContext(CartContext);

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
      return imageData.slice(0, 8); // Change 3 to the number of images you want to display from each folder
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

  /*Navigation to the gallery.*/
  const onImageClickHandler = (image) => {
    const removeAccents = (str) => {
      return str
        .normalize("NFD") // Normalizáljuk a karaktereket Unicode formára
        .replace(/[\u0300-\u036f]/g, ""); // Kicseréljük az ékezetes karaktereket ékezet nélküli változataikra
    };
  
    const capitalizeFirstLetter = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };
  
    let filteredTitle = ""; // Változó létrehozása a szűrt cím tárolásához
    filteredTitle = removeAccents(image.title.split(".")[0]); // Szűrt cím tárolása a változóban
    const words = filteredTitle.split(" "); // Szavakra bontjuk a címet szóköz mentén
    const capitalizedWords = words.map((word) => capitalizeFirstLetter(word)); // Minden szót nagybetűvel kezdünk
    const joinedTitle = capitalizedWords.join(""); // Egyesítjük a szavakat egybe
  
    cartCtx.setScrollToCategory(joinedTitle)
  };

  return (
    <div>
      <div id="myNav" className={overlayClass} onClick={closeNav} style={{ top: menuVisible ? '5rem' : '3rem' }}>
        <div className={styles.container}>
        {images.map((image, index) => (
  <div
    key={`${image.id}-${index}`}
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

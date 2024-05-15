import React, { useState, useContext, useEffect } from "react";
import styles from "./CurtainGallery.module.css"
import CartContext from "../Store/cart-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import { useNavigate } from 'react-router-dom';
import PhotoGallery from "./PhotoGallery";

const CurtainGallery = ({category}) => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const [overlayClass, setOverlayClass] = useState(styles.overlay);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (cartCtx.galleryIsOpen) {
      setOverlayClass(`${styles.overlay} ${styles.overlayOpen}`);
    } else {
      setOverlayClass(`${styles.overlay} ${styles.overlayClose}`);
    }
  }, [cartCtx.galleryIsOpen]);

  const openNav = () => {
    cartCtx.setGalleryIsOpen(true);
  };

  const closeNav = () => {
    cartCtx.setGalleryIsOpen(false);
  };

  /*Images load*/
  useEffect(() => {
    const fetchImages = async () => {
      const imagesData = await fetchImagesFromFolder(`Gallery/${cartCtx.category}`);
      setImages(imagesData);
    };
  
    fetchImages();
  }, [cartCtx.category]);
  

  const fetchImagesFromFolder = async (folder) => {
    try {
      const imageData = await ImageDimensions(folder);
      console.log(imageData)
      return imageData;
    } catch (error) {
      console.error("Hiba a képek lekérése közben", error);
      return [];
    }
  };
  /*Images load*/

  /*If the menu is open you cannot scroll the page*/
  useEffect(() => {
    const body = document.body;
    if (cartCtx.galleryIsOpen) {
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
  }, [cartCtx.galleryIsOpen]);
  /*If the menu is open you cannot scroll the page*/


  
  return (
    <div>
      
      <div id="myNav" className={overlayClass} onClick={closeNav}>
      <a href="javascript:void(0)" class={styles.closebtn} onClick={closeNav}>&times;</a>
        <div>
        <h1 className={styles.categoryTitle}>{cartCtx.categoriesName}</h1>
        <div className={styles.container}>
        <PhotoGallery images={images}></PhotoGallery>
        </div>
        </div>
      </div>

      <span onClick={openNav}></span>
    </div>
  );
};

export default CurtainGallery;

import React, { useState, useContext, useEffect } from "react";
import styles from "./CurtainGallery.module.css";
import CartContext from "../Store/cart-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import { useNavigate } from 'react-router-dom';
import PhotoGallery from "./PhotoGallery";
import BurgerButton from "../BurgerButton/BurgerButton";  // Importáljuk a BurgerButton komponenst

const CurtainGallery = ({ category }) => {
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

  useEffect(() => {
    if (cartCtx.galleryIsOpen) {
      const container = document.getElementById('galleryContainer');
      if (container) {
        container.scrollTop = 0;
      }
    }
  }, [cartCtx.galleryIsOpen]);

  const closeNav = () => {
    cartCtx.setGalleryIsOpen(false);
  };

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
      console.log(imageData);
      return imageData;
    } catch (error) {
      console.error("Hiba a képek lekérése közben", error);
      return [];
    }
  };
  

  useEffect(() => {
    const body = document.body;
    if (cartCtx.galleryIsOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [cartCtx.galleryIsOpen]);

  return (
    <div>
      <div id="galleryContainer" className={overlayClass} onClick={closeNav}>
        <div className={styles.categoryTitle}>
          <h1 className={styles.categoryH1}>{cartCtx.categoriesName}</h1>
        </div>
        <div className={styles.container}>
          <PhotoGallery images={images}></PhotoGallery>
        </div>
      </div>
    </div>
  );
};

export default CurtainGallery;

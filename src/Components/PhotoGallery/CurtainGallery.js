import React, { useState, useContext, useEffect, memo } from "react";
import styles from "./CurtainGallery.module.css";
import CartContext from "../Store/cart-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import { useNavigate } from 'react-router-dom';
import PhotoGallery from "./PhotoGallery";
import BurgerButton from "../BurgerButton/BurgerButton";  // Importáljuk a BurgerButton komponenst
import axios from "axios";  // Add axios import

// Memoized Image Component
const MemoizedImage = memo(({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy" // Lazy loading attribute
    style={{ width: '100%', height: 'auto' }} // Adjust styles as needed
  />
));

const CurtainGallery = ({ category, group }) => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const [overlayClass, setOverlayClass] = useState(styles.overlay);
  const [cachedImages, setCachedImages] = useState({});

  const colorMap = {
    tortak: "#ff7f7f",
    macaronok: "#9DE0B1",
    sutemenyek: "#faf066",
    fondantFigurak: "#86bbd8",
  };

  
  const circleColor = colorMap[group] || "#ddd"; // Alapértelmezett szín, ha nincs egyezés

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
    if (!cachedImages[cartCtx.category]) {
      fetchImagesFromFolder(`Gallery/${cartCtx.category}`).then((imagesData) => {
        setCachedImages((prev) => ({ ...prev, [cartCtx.category]: imagesData }));
      });
    }
  }, [cartCtx.category, cachedImages]);

  const fetchImagesFromFolder = async (folder) => {
    try {
      const imageData = await ImageDimensions(folder);
      try {
        const orderResponse = await axios.get('https://www.szivbolsutok.hu/backend/getImageOrder.php');
        const folderName = `Gallery/${folder.split('/')[1]}`;
        if (orderResponse.data && orderResponse.data[folderName]) {
          const savedOrder = orderResponse.data[folderName];
          const getFilename = (path) => path.split('/').pop();
          const orderedImages = savedOrder
            .map(savedPath => imageData.find(data => getFilename(data.src) === getFilename(savedPath)))
            .filter(Boolean);
          const newImages = imageData.filter(data => !savedOrder.some(savedPath => getFilename(data.src) === getFilename(savedPath)));
          return [...orderedImages, ...newImages];
        }
      } catch (error) {
        console.error("Error loading image order:", error);
      }
      return imageData;
    } catch (error) {
      console.error("Hiba a képek lekérése közben", error);
      return [];
    }
  };

  useEffect(() => {
    document.body.style.overflow = cartCtx.galleryIsOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [cartCtx.galleryIsOpen]);

  return (
    <div>
      <div id="galleryContainer" className={overlayClass}>
      <div className={`${styles.categoryTitle} ${styles[`categoryTitle-${cartCtx.categoriesGroup}`]}`}>
          <h1 className={styles.categoryH1}>{cartCtx.categoriesName}</h1>
        </div>
        <div className={styles.container}>
          <PhotoGallery images={cachedImages[cartCtx.category] || []}></PhotoGallery>
        </div>
      </div>
    </div>
  );
};

export default CurtainGallery;

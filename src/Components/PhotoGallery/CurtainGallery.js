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
      console.log('Setting images array:', imagesData);
      setImages(imagesData);
    };

    fetchImages();
  }, [cartCtx.category]);

  const fetchImagesFromFolder = async (folder) => {
    try {
      const imageData = await ImageDimensions(folder);
      console.log('Original image data:', imageData);
      
      try {
        const orderResponse = await axios.get('http://localhost/backend/getImageOrder.php');
        console.log('Order response:', orderResponse.data);
        
        const folderName = `Gallery/${folder.split('/')[1]}`;
        console.log('Looking for folder name in JSON:', folderName);
        
        if (orderResponse.data && orderResponse.data[folderName]) {
          const savedOrder = orderResponse.data[folderName];
          console.log('Saved order for folder:', savedOrder);
          
          const getFilename = (path) => {
            const filename = path.split('/').pop();
            console.log('Getting filename from path:', path, ' -> ', filename);
            return filename;
          };
          
          const orderedImages = savedOrder
            .map(savedPath => {
              const savedFilename = getFilename(savedPath);
              console.log('Looking for file:', savedFilename);
              const foundImage = imageData.find(data => {
                const dataFilename = getFilename(data.src);
                console.log('Comparing with:', dataFilename);
                return dataFilename === savedFilename;
              });
              console.log('Found image:', foundImage ? 'yes' : 'no');
              return foundImage;
            })
            .filter(Boolean);
          
          console.log('Ordered images:', orderedImages);
          
          const newImages = imageData.filter(data => 
            !savedOrder.some(savedPath => getFilename(data.src) === getFilename(savedPath))
          );
          console.log('New images:', newImages);
          
          const finalImages = [...orderedImages, ...newImages];
          console.log('Final ordered images array:', finalImages);
          return finalImages;
        }
      } catch (error) {
        console.error("Error loading image order:", error);
      }
      
      console.log('Returning original image data:', imageData);
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
      <div id="galleryContainer" className={overlayClass}>
        <div className={styles.categoryTitle}>
          <h1 className={styles.categoryH1}>{cartCtx.categoriesName}</h1>
        </div>
        <div className={styles.container}>
          {console.log('Images being passed to PhotoGallery:', images)}
          <PhotoGallery images={images}></PhotoGallery>
        </div>
      </div>
    </div>
  );
};

export default CurtainGallery;
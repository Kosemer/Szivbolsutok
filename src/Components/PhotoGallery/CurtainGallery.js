import React, { useState, useContext, useEffect } from "react";
import styles from "./CurtainGallery.module.css";
import CartContext from "../Store/cart-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import { useNavigate } from 'react-router-dom';
import PhotoGallery from "./PhotoGallery";
import BurgerButton from "../BurgerButton/BurgerButton";  // Importáljuk a BurgerButton komponenst
import axios from "axios";  // Add axios import

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
      // Get the image data first
      const imageData = await ImageDimensions(folder);
      console.log('Original image data:', imageData);
      
      // Get the saved order from the server
      try {
        const orderResponse = await axios.get('http://localhost/backend/getImageOrder.php');
        console.log('Order response:', orderResponse.data);
        
        // Fix the folder name extraction to match the JSON structure
        const folderName = `Gallery/${folder.split('/')[1]}`; // This should give us "Gallery/FondantFigurak"
        console.log('Looking for folder name in JSON:', folderName);
        
        if (orderResponse.data && orderResponse.data[folderName]) {
          // If we have a saved order for this folder
          const savedOrder = orderResponse.data[folderName];
          console.log('Saved order for folder:', savedOrder);
          
          // Helper function to get just the filename from a path
          const getFilename = (path) => {
            const filename = path.split('/').pop();
            console.log('Getting filename from path:', path, ' -> ', filename);
            return filename;
          };
          
          // First take images in the saved order
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
            .filter(Boolean); // Remove any undefined entries
          
          console.log('Ordered images:', orderedImages);
          
          // Then add any new images that aren't in the saved order
          const newImages = imageData.filter(data => 
            !savedOrder.some(savedPath => getFilename(data.src) === getFilename(savedPath))
          );
          console.log('New images:', newImages);
          
          // Return combined array of ordered and new images
          const finalImages = [...orderedImages, ...newImages];
          console.log('Final ordered images array:', finalImages);
          return finalImages;
        }
      } catch (error) {
        console.error("Error loading image order:", error);
      }
      
      // If no saved order or error occurred, return original image data
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
      <div id="galleryContainer" className={overlayClass} onClick={closeNav}>
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

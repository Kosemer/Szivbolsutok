import React, { useState, useEffect, useContext } from "react";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import classes from "./CardGalleryTest.module.css";
import { useNavigate } from "react-router-dom";
import CartContext from "../Store/cart-context";

const CardGalleryTest = ({ categories, categoriesName }) => {
  const cartCtx = useContext(CartContext);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await ImageDimensions(categories);
        const combinedImages = imageData.slice(0, 3);
        setImages(combinedImages);
      } catch (error) {
        console.error("Hiba a képek lekérése közben", error);
        setImages([]);
      }
    };

    fetchImages();
  }, [categories]);

  const onImageClickHandler = () => {
    cartCtx.setCategory(categories);
    cartCtx.setCategoriesName(categoriesName);
    cartCtx.setGalleryIsOpen(!cartCtx.galleryIsOpen);
    console.log(cartCtx.category);
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.rowContainer}>
        {images.map((image, index) => (
          <div key={index} className={`${classes.customCol} ${classes.col}`}>
            <div className={classes.card} onClick={() => onImageClickHandler()}>
              <img
                src={image.src}
                alt={image.caption}
                className={classes.imageStyle}
              />
              <div className={classes.cardBody}>
                <p className={classes.cardText}>
                  {image.title.split(".")[0]}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className={classes.col}>
          <div className={classes.cardBodyNext} onClick={() => onImageClickHandler()}>
            <p className={classes.cardTextNext}>
              További képek
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-arrow-right-circle-fill ms-3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGalleryTest;

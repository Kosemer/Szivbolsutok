import React, { useState, useEffect, useContext } from "react";
import classes from "./CategorySection2.module.css";
import test from "../../Assets/CategorySection/almas.png";
import CartContext from "../Store/cart-context";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";

const CategorySection2 = ({ categories, CategoryGallery, categoriesName }) => {
  const cartCtx = useContext(CartContext);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await ImageDimensions(CategoryGallery);
        const combinedImages = imageData.slice(0, 3);
        setImages(combinedImages);
      } catch (error) {
        console.error("Hiba a képek lekérése közben", error);
        setImages([]);
      }
    };

    fetchImages();
  }, [CategoryGallery]);

  const onImageClickHandler = () => {
    cartCtx.setCategory(categories);
    cartCtx.setCategoriesName(categoriesName);
    cartCtx.setGalleryIsOpen(!cartCtx.galleryIsOpen);
  };

  return (
    <div className={classes["background-container"]}>
      <div className={classes["image-row"]}>
        <img src={test} alt="Cake 1" className={classes["overlay-image"]} />
        <img src={test} alt="Cake 2" className={classes["overlay-image"]} />
        <img src={test} alt="Cake 3" className={classes["overlay-image"]} />
      </div>
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
  );
};

export default CategorySection2;

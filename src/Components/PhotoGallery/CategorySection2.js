import React, { useState, useEffect, useContext } from "react";
import classes from "./CategorySection2.module.css";
import test from "../../Assets/CategorySection/almas.png";
import CartContext from "../Store/cart-context";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";

const CategorySection2 = ({ category, CategoryGallery, categoriesName }) => {
  const cartCtx = useContext(CartContext);
  const [images, setImages] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Állapot a képernyő szélességére

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let imageData = await ImageDimensions(CategoryGallery);
        
        // Rendezés a fájlnév elején lévő szám szerint
        imageData = imageData
          .slice(0, 3) // Az első három kép
          .sort((a, b) => {
            const numA = parseInt(a.src.match(/\d+/)?.[0]) || 0;
            const numB = parseInt(b.src.match(/\d+/)?.[0]) || 0;
            return numA - numB;
          });

        setImages(imageData);

      } catch (error) {
        console.error("Hiba a képek lekérése közben", error);
        setImages([]);
      }
    };

    fetchImages();

    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Ablakméret változása
    };

    window.addEventListener("resize", handleResize); // Figyeljük az ablak méretének változását

    return () => {
      window.removeEventListener("resize", handleResize); // Eltávolítjuk az eseményfigyelőt
    };
  }, [CategoryGallery]);

  const onImageClickHandler = () => {
    cartCtx.setCategory(category);
    cartCtx.setCategoriesName(categoriesName);
    cartCtx.setGalleryIsOpen(!cartCtx.galleryIsOpen);
  };

  // Kategória szavak szétszedése és feltérképezése
  const words = category.split(" ");
  const firstWord = words[0];
  const secondWord = words.length > 1 ? words.slice(1).join(" ") : null; // Ha több szó van, akkor a második szó és az összes többi összekapcsolása

  // Mobil nézetben csak egy képet jelenítünk meg
  const imagesToDisplay = windowWidth <= 768 ? images.slice(0, 1) : images;

  return (
    <div className={classes["background-container"]}>
      {/* Bal felső sarokban a cím */}
      <h1 className={classes["page-title"]}>{firstWord}</h1>
      {secondWord && <h1 className={classes["page-title2"]}>{secondWord}</h1>}

      <div className={classes["image-row"]}>
        {imagesToDisplay.length > 0
          ? imagesToDisplay.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={`Cake ${index + 1}`}
                className={classes["overlay-image"]}
              />
            ))
          : [1, 2, 3].map((_, index) => (
              <img
                key={index}
                src={test}
                alt={`Placeholder Cake ${index + 1}`}
                className={classes["overlay-image"]}
              />
            ))}
      </div>

      <div className={classes.col}>
        <div className={classes.cardBodyNext} onClick={onImageClickHandler}>
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

import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./CategorySection2.module.css";
import test from "../../Assets/CategorySection/almas.png";
import CartContext from "../Store/cart-context";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";

const CategorySection2 = ({ category, categoryTitle, CategoryGallery, categoriesName }) => {
  const cartCtx = useContext(CartContext);
  const [images, setImages] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Állapot a képernyő szélességére
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await ImageDimensions(CategoryGallery);
        const combinedImages = imageData.slice(0, 3); // Az első három kép
        setImages(combinedImages);
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize); // Eltávolítjuk az eseményfigyelőt
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [CategoryGallery]);

  const onImageClickHandler = () => {
    cartCtx.setCategory(category);
    cartCtx.setCategoriesName(categoriesName);
    cartCtx.setGalleryIsOpen(!cartCtx.galleryIsOpen);
  };

  // Kategória szavak szétszedése és feltérképezése
  const words = categoryTitle.split(" ");
  const firstWord = words[0];
  const secondWord = words.length > 1 ? words.slice(1).join(" ") : null; // Ha több szó van, akkor a második szó és az összes többi összekapcsolása

  // Mobil nézetben csak egy képet jelenítünk meg
// Ellenőrizzük, hogy van-e legalább egy kép
const mobileImage = images.length > 0 
  ? images.find((img) => img.src.includes("1_")) || images[0] 
  : null;

// Ha mobilnézet van, csak ezt az egy képet jelenítsük meg (ha van kép)
const imagesToDisplay = windowWidth <= 768 
  ? mobileImage 
    ? [mobileImage] 
    : [] 
  : images;


  return (
    <div
      ref={containerRef}
      className={`${classes["background-container"]} ${
        words.length === 1 ? classes["background-container-single"] : ""
      }`}
    >
      {words.length === 1 ? (
        <h1 className={`${classes["page-title3"]} ${isVisible ? classes.animate : ''}`}>
          {firstWord}
        </h1>
      ) : (
        <>
          <h1 className={`${classes["page-title"]} ${isVisible ? classes.animate : ''}`}>
            {firstWord}
          </h1>
          <h1 className={`${classes["page-title2"]} ${isVisible ? classes.animate : ''}`}>
            {secondWord}
          </h1>
        </>
      )}

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
          <p className={`${classes.cardTextNext} ${isVisible ? classes.animate : ''}`}>
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

import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./CategorySection2.module.css";
import test from "../../Assets/CategorySection/almas.png";
import CartContext from "../Store/cart-context";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import axios from "axios"; // Import axios for HTTP requests

const CategorySection2 = ({
  category,
  categoryTitle,
  CategoryGallery,
  categoriesName,
  group,
}) => {
  const cartCtx = useContext(CartContext);
  const [images, setImages] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State for window width
  const [isVisible, setIsVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false); // State for card visibility
  const containerRef = useRef(null);
  const cardRef = useRef(null); // Ref for the card text

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await ImageDimensions(CategoryGallery);
        const orderedImages = await fetchImageOrder(CategoryGallery);
        console.log("imageData", imageData);
        // If there is no saved order, load all images
        const combinedImages = (
          orderedImages.length > 0 ? orderedImages : imageData
        ).map((image) => ({
          ...image,
          src: image.src.startsWith("http://localhost")
            ? image.src
            : `http://localhost/${image.src}`,
        }));

        setImages(combinedImages);
        console.log("combinedImages", combinedImages);
      } catch (error) {
        console.error("Error fetching images", error);
        setImages([]);
      }
    };

    fetchImages();

    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Update window width on resize
    };

    window.addEventListener("resize", handleResize); // Listen for window resize

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Observer for card text visibility
    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCardVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      cardObserver.observe(cardRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up resize listener
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      if (cardRef.current) {
        cardObserver.unobserve(cardRef.current);
      }
    };
  }, [CategoryGallery]);

  const fetchImageOrder = async (folder) => {
    // Fetch ordered images based on the folder
    try {
      const orderResponse = await axios.get(
        "http://localhost/backend/getImageOrder.php"
      );

      const folderName = `CategoryGallery/${folder.split("/")[1]}`;
      console.log("Looking for folder name in JSON:", folderName);

      if (orderResponse.data && orderResponse.data[folderName]) {
        const savedOrder = orderResponse.data[folderName];

        // Map the saved order to the actual image data
        const orderedImages = savedOrder.map((savedPath) => {
          return {
            src: savedPath, // Use the path directly
            alt: savedPath.split("/").pop(), // Use the filename as alt text
          };
        });

        return orderedImages;
      }
    } catch (error) {
      console.error("Error loading image order:", error);
    }
    return []; // Return an empty array if there's an error
  };

  const onImageClickHandler = () => {
    cartCtx.setCategory(category);
    cartCtx.setCategoriesName(categoriesName);
    cartCtx.setGalleryIsOpen(!cartCtx.galleryIsOpen);
  };

  // Split category title into words
  const words = categoryTitle.split(" ");
  const firstWord = words[0];
  const secondWord = words.length > 1 ? words.slice(1).join(" ") : null; // Handle multiple words

  /*   // Display only one image in mobile view
  const mobileImage =
    images.length > 0
      ? images.find((img) => img.src.includes("1_")) || images[0]
      : null;

  const imagesToDisplay =
    windowWidth <= 767 ? (mobileImage ? [mobileImage] : []) : images; */

  // Az első kép kiválasztása mobilnézetben
  const mobileImage = images.length > 0 ? images[0] : null;

  // Ha mobilnézet van (<= 767px), akkor csak az első képet jelenítse meg
  const imagesToDisplay =
    windowWidth <= 767 ? (mobileImage ? [mobileImage] : []) : images;


    const colorMap = {
      tortak: "#ff7f7f",
      macaronok: "#9DE0B1",
      sutemenyek: "#faf066",
      fondantFigurak: "#86bbd8",
    };
    
    const circleColor = colorMap[group] || "#ddd"; // Alapértelmezett szín, ha nincs egyezés

  return (
    <div
      ref={containerRef}
      className={`${classes["background-container"]} ${
        classes[`background-container-${group}`] || ""
      }`}
    >
      {words.length === 1 ? (
        <h1
          className={`${classes["page-title3"]} ${
            classes[`page-title3-${group}`] || ""
          } ${isVisible ? classes.animate : ""}`}
        >
          {firstWord}
        </h1>
      ) : (
        <>
          <h1
            className={`${classes["page-title"]} ${
              classes[`page-title-${group}`] || ""
            } ${isVisible ? classes.animate : ""}`}
          >
            {firstWord}
          </h1>
          <h1
            className={`${classes["page-title2"]} ${
              classes[`page-title2-${group}`] || ""
            } ${isVisible ? classes.animate : ""}`}
          >
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
                alt={image.alt} // Use the alt text from the ordered images
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
        <div
          className={classes.cardBodyNext}
          ref={cardRef}
          onClick={onImageClickHandler}
        >
          <p
            className={`${classes["cardTextNext"]} ${
              classes[`cardTextNext-${group}`] || ""
            } ${isCardVisible ? classes.animate : ""}`}
          >
            További képek

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className="bi bi-arrow-right-circle-fill ms-3"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8"  fill={circleColor} />

              <path
                d="M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                fill="#473939"
                strokeWidth="0.3"
                stroke="#473939"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySection2;

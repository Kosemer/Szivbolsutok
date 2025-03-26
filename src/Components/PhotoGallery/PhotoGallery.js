import React, { useState, useCallback, useContext, memo } from "react"; // Import memo
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import classes from "./PhotoGallery.module.css";
import CartContext from "../Store/cart-context";
import tk from "../../Assets/MentesIcon/TK.png";
import ch from "../../Assets/MentesIcon/CH.png";
import eggFree from "../../Assets/MentesIcon/eggFree2.png";
import gluten from "../../Assets/MentesIcon/gluten2.png";
import milk from "../../Assets/MentesIcon/milk.png";
import sugar from "../../Assets/MentesIcon/sugar.png";
import DietIconSection from "./DietIconSection";

const iconMapping = {
  tk: tk,
  ch: ch,
  eggFree: eggFree,
  gluten: gluten,
  milk: milk,
  sugar: sugar,
};

// Memoized Image Component
const MemoizedImage = memo(({ photo, onClick, title }) => (
  <img
    alt={title}
    {...photo}
    onClick={onClick}
    loading="lazy" // Lazy loading attribute
    style={{ cursor: "pointer" }}
  />
));

const PhotoGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const cartCtx = useContext(CartContext);

  const openLightbox = useCallback((event, { index }) => {
    event.stopPropagation();
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const getFileNameWithoutExtension = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.');
  };

  const renderImage = ({ index, photo, margin }) => {
    const fileName = photo.src.split("/").pop(); // Képfájl neve
    const matches = fileName.match(/\((.*?)\)/); // Zárójel előtti szöveg
    const textBeforeIcon = matches ? fileName.split("(")[0].trim() : ""; // Zárójel előtti szöveg
    const matchedIcons = matches ? matches[0].replace(/[()]/g, "").split(",") : []; // Jelölések szétválasztása vesszővel
    const icons = matchedIcons.map((key) => iconMapping[key.trim()]);
    const title = getFileNameWithoutExtension(photo.title);

    return (
      <div key={index} style={{ margin, display: "inline-block", position: "relative" }}>
        <MemoizedImage
          photo={photo}
          onClick={(e) => openLightbox(e, { index })}
          title={title}
        />
        {cartCtx.category === "MentesSutemenyek" && icons.length > 0 ? (
          <div className={classes.captionContainer}>
            <div>{textBeforeIcon}</div> {/* Zárójel előtti szöveg külön sorban */}
            {icons.map((icon, idx) => (
              <img key={idx} src={icon} alt={`${matchedIcons[idx]} icon`} className={classes.mentesImage} />
            ))}
          </div>
        ) : (
          <div className={classes.captionContainer}>
            <div>{title}</div> {/* Megjeleníti a fájlnevet kiterjesztés nélkül */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {cartCtx.category === "MentesSutemenyek" && <DietIconSection />}
      <Gallery photos={images} renderImage={renderImage} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={images.map((image) => {
                const fileName = image.src.split("/").pop(); // Képfájl neve
                const matches = fileName.match(/\((.*?)\)/); // Zárójel előtti szöveg
                const textBeforeIcon = matches ? fileName.split("(")[0].trim() : ""; // Zárójel előtti szöveg
                const matchedIcons = matches ? matches[0].replace(/[()]/g, "").split(",") : []; // Jelölések szétválasztása vesszővel
                const icons = matchedIcons.map((key) => iconMapping[key.trim()]).filter(Boolean); // Filter out undefined icons
                const title = getFileNameWithoutExtension(image.title);
                
                // Defensive check for image source
                const imageSrc = icons.length > 0 ? image.src : image.src; // Use the original image source
                if (!imageSrc) {
                  console.error("Image source is undefined for:", image);
                }

                return {
                  ...image,
                  src: imageSrc, // Ensure the original image source is used
                  srcset: image.srcSet,
                  caption: title, // Megjeleníti a fájlnevet kiterjesztés nélkül
                  textBeforeIcon: textBeforeIcon, // Zárójel előtti szöveg hozzáadása a Carousel nézetben
                };
              })}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default PhotoGallery;
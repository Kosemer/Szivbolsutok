import React, { useState, useCallback, useContext } from "react";
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

const iconMapping = {
  tk: tk,
  ch: ch,
  eggFree: eggFree,
  gluten: gluten,
  milk: milk,
  sugar: sugar,
};

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

  const renderImage = ({ index, photo, margin }) => {
    const fileName = photo.src.split("/").pop(); // Képfájl neve
    const matches = fileName.match(/\((.*?)\)/); // Zárójel előtti szöveg
    const textBeforeIcon = matches ? fileName.split("(")[0].trim() : ""; // Zárójel előtti szöveg
    const matchedIcons = matches ? matches[0].replace(/[()]/g, "").split(",") : []; // Jelölések szétválasztása vesszővel
    const icons = matchedIcons.map((key) => iconMapping[key.trim()]);

    return (
      <div key={index} style={{ margin, display: "inline-block", position: "relative" }}>
        <img
          alt={photo.title}
          {...photo}
          onClick={(e) => openLightbox(e, { index })}
          style={{ cursor: "pointer" }}
        />
        {cartCtx.category === "MentesSutemenyek" && icons.length > 0 && (
          <div className={classes.captionContainer}>
            {/*<div>{textBeforeIcon}</div>*/} {/* Zárójel előtti szöveg külön sorban */}
            {icons.map((icon, idx) => (
              <img key={idx} src={icon} alt={`${matchedIcons[idx]} icon`} className={classes.mentesImage} />
            ))}
            {/*<span className={classes.caption}>{photo.title}</span>*/}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={classes.container}>
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
                const icons = matchedIcons.map((key) => iconMapping[key.trim()]);
                return {
                  ...image,
                  src: icons.length > 0 ? icons[0] : image.src,
                  srcset: image.srcSet,
                  caption: image.title,
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

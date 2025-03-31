import React, { useState, useContext } from "react";
import classes from "./ResizeImage.module.css";
import CartContext from "../../Components/Store/cart-context";

const ResizeImage = ({
  imageFile,
  setImageFile,
  onResizeSuccess,
  scale = 0.6,
  selectedFile,
}) => {
  const cartCtx = useContext(CartContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  console.log(selectedFile);

  const resizeImage = () => {
    setButtonClicked(true);
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const resizedImageFile = new File([blob], imageFile.name.replace(/\.[^.]+$/, '.webp'), {
            type: "image/webp",
          });
          setImageFile(resizedImageFile);
          onResizeSuccess(resizedImageFile.size);
        },
        "image/webp",
        0.8 // Adjust quality for better compression
      );
    };
  };

  return (
    <div className={cartCtx.isOpenResize ? classes.container : classes.containerClosed}>
      <h3>Kép optimalizálása</h3>
      <p className={classes.description}>
        A weboldalon lévő képek optimalizáltak, ami azt jelenti, hogy az eredeti
        méretükhöz képest 75%-al csökkentve vannak. Ez jelentős méretbeni
        különbséget jelent, ami a minőségben nem vehető észre.
        <strong>
          <br></br>Javasolt a képek optimalizálása feltöltés előtt, amennyiben
          nagyobb méretűek, hogy a weboldal betöltési ideje rövid legyen.
        </strong>
      </p>
      <div className={classes.resizeButtonContainer}>
        <button
          type="button"
          onClick={resizeImage}
          disabled={!imageFile || imageFile.resized}
          className={classes.resizeButton}
        >
          Kép átméretezése {scale * 100}%-ra és mentése WebP-ként
        </button>
      </div>
      {!selectedFile && buttonClicked && (
        <p className={classes.errorMessage}>Válassz ki egy képet</p>
      )}
    </div>
  );
};

export default ResizeImage;

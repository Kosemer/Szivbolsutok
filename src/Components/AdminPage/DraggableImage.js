/* Húzható képet jelenít meg.

A draggable attribútummal beállítja, hogy a kép húzható legyen. Az onDragStart eseménykezelőben meghatározza, hogy mi történjen, amikor a húzás elindul: itt az imageIndex adatot rendeli hozzá a dataTransfer objektumhoz, amely lehetővé teszi, hogy az indexet használhassuk a drag-and-drop műveletek során.

A kép forrását (src) az image prop alapján állítja be, ami egy URL utolsó része, és a kép helyét a szerveren jelöli. */

import classes from "./DraggableImage.module.css";
import CartContext from "../../Components/Store/cart-context";
import React, { useContext } from "react";
import DeleteIcon from "../../Assets/DeleteIcon.svg";
import darkModeClasses from "./DarkMode.module.css";

const DraggableImage = ({ index, image, handleImageClick, onDragDrop }) => {
  const cartCtx = useContext(CartContext);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add(classes.dragOver);
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove(classes.dragOver);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove(classes.dragOver);
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"));
    if (dragIndex !== index) {
      onDragDrop(dragIndex, index);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    cartCtx.setImageToDelete(image);
    cartCtx.setIsModalOpen(true);
  };

  // Eltávolítjuk a '../' prefixet és hozzáadjuk a teljes szerver URL-t
  const imageUrl = `https://www.szivbolsutok.hu/${image.replace('../', '')}`;

  return (
    <div 
      className={classes.imageContainer} 
      onClick={handleDeleteClick}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img
        src={imageUrl}
        alt=""
        className={classes.draggableImage}
        onClick={() => handleImageClick(image)}
      />
      <div className={classes.overlay}>
        {/*<div className={classes.x}>X</div>*/}
        <img src={DeleteIcon} alt="Delete" />
      </div>
    </div>
  );
};

export default DraggableImage;

import React, { useContext } from "react";
import axios from "axios";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import CartContext from "../../Components/Store/cart-context";

const DeleteImage = ({ loadImages }) => {
  const cartCtx = useContext(CartContext);

  const handleDeleteConfirmed = async (e) => {
    e.preventDefault();
    try {
      // Eltávolítjuk az assets/ részt az útvonalból, mert a szerver hozzáadja
      const imagePath = cartCtx.imageToDelete.replace('assets/', '');
      console.log('Deleting image:', imagePath);

      const response = await axios({
        method: "DELETE",
        url: "http://localhost/backend/deleteImage.php",
        data: {
          image: imagePath
        },
        headers: { 
          "Content-Type": "application/json"
        },
        withCredentials: false
      });

      console.log('Server response:', response.data);
      cartCtx.setDeleteSuccess(true);
      setTimeout(() => {
        cartCtx.setDeleteSuccess(false);
      }, 2000);
      await loadImages();
      cartCtx.setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting image:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  return (
    <ConfirmDeleteModal
      isOpen={cartCtx.isModalOpen}
      onClose={() => cartCtx.setIsModalOpen(false)}
      onDelete={handleDeleteConfirmed}
      isDarkMode={cartCtx.isDarkMode}
    />
  );
};

export default DeleteImage;

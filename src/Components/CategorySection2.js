import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import CartContext from '../../Components/Store/cart-context';
import classes from './CategorySection2.module.css'; // Assuming you have a CSS module for styling

const CategorySection2 = () => {
    const cartCtx = useContext(CartContext);

    const loadImages = async () => {
        try {
            const response = await axios.get(`http://localhost/backend/listImages.php?folder=${cartCtx.selectedFolder}`);
            if (response.data) {
                // Process and set images
                cartCtx.setFolderImages(response.data.map(imagePath => imagePath.replace('../', '')));
            }
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    useEffect(() => {
        if (cartCtx.selectedFolder) {
            loadImages();
        }
    }, [cartCtx.selectedFolder]);

    return (
        <div className={classes.imageGrid}>
            {cartCtx.folderImages.length > 0 ? (
                cartCtx.folderImages.map((image, index) => (
                    <div key={index} className={classes.imageContainer}>
                        <img src={image} alt={`Image ${index}`} className={classes.image} />
                    </div>
                ))
            ) : (
                <p>No images available in this category.</p>
            )}
        </div>
    );
};

export default CategorySection2; 
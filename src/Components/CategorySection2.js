import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import CartContext from '../../Components/Store/cart-context';

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
        <div>
            {/* Render images here */}
        </div>
    );
};

export default CategorySection2; 
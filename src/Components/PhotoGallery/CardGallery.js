import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import classes from "./CardGallery.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartContext from "../Store/cart-context";

const CardGallery = ({ categories, categoriesName }) => {
  const cartCtx = useContext(CartContext);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await ImageDimensions(categories);
        const combinedImages = imageData.slice(0, 3);
        setImages(combinedImages);
      } catch (error) {
        console.error("Hiba a képek lekérése közben", error);
        setImages([]);
      }
    };

    fetchImages();
  }, [categories]);

  const onImageClickHandler = () => {
    cartCtx.setCategory(categories);
    cartCtx.setCategoriesName(categoriesName);
    cartCtx.setGalleryIsOpen(!cartCtx.galleryIsOpen);
    console.log(cartCtx.category);
  };

  return (
    <div>
      <Container className={classes.cardContainer}>
        <Row className={classes.rowContainer}>
          {images.map((image, index) => (
            <Col key={index} xs={12} md={6} lg={3} className={`mb-4 mt-4 d-flex ${classes.customCol}`}>
              <Card className="shadow" style={{ height: "100%" }} onClick={() => onImageClickHandler()}>
                <Card.Img
                  variant="top"
                  src={image.src}
                  alt={image.caption}
                  className={classes.imageStyle}
                />
                <Card.Body className={classes.cardBody}>
                  <Card.Text className={classes.cardText}>
                    {image.title.split(".")[0]}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className={classes.cardBodyNext} style={{ height: "100%" }}>
              <Card.Body>
                <Card.Text
                  className={classes.cardTextNext}
                  style={{
                    width: "200px",
                    height: "100%",
                  }}
                  onClick={() => onImageClickHandler()}
                >
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
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CardGallery;

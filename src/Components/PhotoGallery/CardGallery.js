import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ImageDimensions } from "../../Pages/PhotoGalleryPage/ImageDimensions";
import classes from "./CardGallery.module.css";

const CardGallery = ({ categories }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesData = await Promise.all([fetchImagesFromFolder(categories)]);

      const combinedImages = imagesData.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      setImages(combinedImages);
    };

    fetchImages();
  }, []);

  const fetchImagesFromFolder = async (folder) => {
    try {
      const imageData = await ImageDimensions(folder);
      return imageData.slice(0, 3); // Change 3 to the number of images you want to display from each folder
    } catch (error) {
      console.error("Hiba a képek lekérése közben", error);
      return [];
    }
  };

  console.log(images)

  return (
    <Container className={classes.cardContainer}>
      <Row>
        {images.map((image, index) => (
          <Col key={index} xs={12} md={6} lg={3} className="mb-4">
            <Card className="shadow" style={{ height: "100%",  }}>
              <Card.Img
                variant="top"
                src={image.src}
                alt={image.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover", backgroundColor: "rgba(255, 0, 0, 0.5)"              }}
              />
              <Card.Body className={classes.cardBody}>
                <Card.Text className={classes.cardText}
                >
                  {image.title.split(".")[0]}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col xs={12} md={6} lg={3} className="mb-4">
          <Card
            className={classes.cardBodyNext}
            style={{ height: "100%" }}
          >
            <Card.Body>
              <Card.Text
                className={classes.cardTextNext}
                style={{ height: "100%" }}
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
  );
};

export default CardGallery;

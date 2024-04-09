import React from "react";
import { Container } from "react-bootstrap";
import styles from "./CategorySection.module.css"; // CSS modul importálása

const CategorySection = ({ category, imageSrc }) => {
  return (
    <Container fluid className="mt-4" style={{ "--bs-gutter-x": "0rem", marginTop: "0px" }}>
      <div className={styles.wrapper}>
        {/* Szöveg */}
        <div className={styles.h1TextBox}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: "100vh",

            textAlign: "center",
          }}
        >
          <h1
            className={styles.h1Text}
            style={{
              fontSize: "5rem",
              fontFamily: "Bebas Neue",
              color: "rgb(33, 37, 40)",
              fontWeight: 500,
              lineHeight: "1", // Adjust line height if needed
              textTransform: "uppercase", // Set text to uppercase
              marginLeft: "100%",
              marginRight: "0%",
              zIndex: 10,
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            {category.split(" ").map((word, index) => (
              <div key={index}>{word}</div>
            ))}
            {/* Új szöveg */}
            <div className={styles.text}
              style={{
                fontSize: "1.4rem",
                fontWeight: 400,
                textAlign: "center",
                marginTop: "40px",
                fontFamily: "Sorts Mill Goudy",
                textTransform: "none",
              }}
            >
              A hagyományos torták számos kultúrában és országban jelentős
              szerepet töltenek be ünnepi és különleges alkalmakon. Ezek a
              desszertek gyakran több generáció receptjei alapján készülnek
            </div>
          </h1>
          <div className={styles.svgArrow}
            style={{
              alignSelf: "flex-end",
              zIndex: "10",
              marginBottom: "0px",
              
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="450"
              fill="rgb(33, 37, 40, 0.9)"
              className="bi bi-arrow-down"
              viewBox="0 0 16 26"
            >
              <path
                fillRule="evenodd"
                stroke="rgb(33, 37, 40, 0.9)"
                strokeWidth="0.1"
                d="M8 1a.5.5 0 0 1 .5.5v40.293l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 41.793V1.5A.5.5 0 0 1 8 1"
              />
            </svg>
          </div>
        </div>
        {/* Kép */}
        <div className={styles["image-container"]}> {/* CSS modul osztály */}
          <img
            src={imageSrc}
            alt={category}
            className={styles.image} 
          />
        </div>
      </div>
    </Container>
  );
};

export default CategorySection;

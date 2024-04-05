import React from "react";
import { Container } from "react-bootstrap";

const SectionWithImage = ({ category, imageSrc }) => {
  return (
    <Container
      fluid
      className="mt-5"
      style={{
        "--bs-gutter-x": "0rem",
        marginTop: "0px",
      }}
    >
      <div className="d-flex">
        {/* Szöveg */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: "100vh",
          }}
        >
          <h1
            className="text-center"
            style={{
              fontSize: "5rem",
              fontFamily: "Bebas Neue",
              color: "rgb(33, 37, 40)",
              fontWeight: 500,
              lineHeight: "1", // Adjust line height if needed
              textTransform: "uppercase", // Set text to uppercase
              marginLeft: "70%",
              zIndex: 10,
              textAlign: "justify",
            }}
          >
            {category.split(" ").map((word, index) => (
              <div key={index}>{word}</div>
            ))}
            {/* Új szöveg */}
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 400,
                textAlign: "center",
                marginTop: "40px",
                fontFamily: "Playfair-Display",
                textTransform: "none",
              }}
            >
              A hagyományos torták számos kultúrában és országban jelentős
              szerepet töltenek be ünnepi és különleges alkalmakon. Ezek a
              desszertek gyakran több generáció receptjei alapján készülnek
            </div>
          </h1>
          <div
            style={{
              alignSelf: "flex-end",
              zIndex: "10",
              marginBottom: "0px",
              marginLeft: "-40px"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="450"
              fill="currentColor"
              className="bi bi-arrow-down"
              viewBox="0 0 16 26"
            >
              <path
                fillRule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v40.293l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 41.793V1.5A.5.5 0 0 1 8 1"
              />
            </svg>
          </div>
        </div>
        {/* Kép */}
        <div
          style={{
            flex: 2,
            background:
              "linear-gradient(to bottom, rgb(236, 141, 147) 80%, rgb(255, 255, 255, 0) 20%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "100vh",
          }}
        >
          <img
            src={imageSrc}
            alt={category}
            style={{
              maxWidth: "100%", // A kép legnagyobb engedélyezett szélessége
              maxHeight: "90%", // A kép legnagyobb engedélyezett magassága
              objectFit: "cover",
              filter: "brightness(0.9)",
              borderRadius: "0 0px 0px 0px",
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default SectionWithImage;

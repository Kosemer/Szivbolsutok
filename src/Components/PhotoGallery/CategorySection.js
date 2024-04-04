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
            maxHeight: "100vh"
          }}
        >
          <h1
            className="text-center text-black"
            style={{
              fontSize: "3rem",
              fontFamily: "BebasNeue",
              color: "rgb(33, 37, 40)",
              fontWeight: 600,
              lineHeight: "1.2", // Adjust line height if needed
              textTransform: "uppercase", // Set text to uppercase
              marginLeft: "70%",
              zIndex: 10,
            }}
          >
            {category.split(" ").map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </h1>
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
              maxHeight: "100vh"
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

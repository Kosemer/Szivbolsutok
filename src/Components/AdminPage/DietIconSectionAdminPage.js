import React, { useState, useContext } from "react";
import classes from "./DietIconSectionAdminPage.module.css";
import tk from "../../Assets/MentesIcon/TK.png";
import ch from "../../Assets/MentesIcon/CH.png";
import eggFree from "../../Assets/MentesIcon/eggFree2.png";
import gluten from "../../Assets/MentesIcon/gluten2.png";
import milk from "../../Assets/MentesIcon/milk.png";
import sugar from "../../Assets/MentesIcon/sugar.png";
import CartContext from "../Store/cart-context";

const DietIconSectionAdminPage = () => {
  const cartCtx = useContext(CartContext);

  const icons = [
    {
      src: tk,
      alt: "Teljeskiőrlésű",
      text: "Teljeskiőrlésű",
      abbreviation: "tk",
    },
    {
      src: ch,
      alt: "Szénhidrátcsökkentett",
      text: "Szénhidrátcsökkentett",
      abbreviation: "ch",
    },
    {
      src: eggFree,
      alt: "Tojásmentes",
      text: "Tojásmentes",
      abbreviation: "eggFree",
    },
    {
      src: gluten,
      alt: "Gluténmentes",
      text: "Gluténmentes",
      abbreviation: "gluten",
    },
    { src: milk, alt: "Tejmentes", text: "Tejmentes", abbreviation: "milk" },
    {
      src: sugar,
      alt: "Cukormentes",
      text: "Cukormentes",
      abbreviation: "sugar",
    },
  ];

  const handleClick = (abbreviation) => {
    if (cartCtx.selectedIcons.includes(abbreviation)) {
        cartCtx.setSelectedIcons(cartCtx.selectedIcons.filter((icon) => icon !== abbreviation));
    } else {
        cartCtx.setSelectedIcons([...cartCtx.selectedIcons, abbreviation]);
    }
    console.log(cartCtx.selectedIcons);
  };

  return (
    <div className={classes.iconContainer}>
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`${classes.iconWrapper} ${
            cartCtx.selectedIcons.includes(icon.abbreviation) && classes.selected
          }`}
          onClick={() => handleClick(icon.abbreviation)}
        >
          <img src={icon.src} alt={icon.alt} className={classes.icon} />
          <div className={classes.iconText}>{icon.text}</div>
        </div>
      ))}
    </div>
  );
};

export default DietIconSectionAdminPage;

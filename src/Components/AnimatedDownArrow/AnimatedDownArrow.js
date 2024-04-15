import React, { useState, useEffect } from "react";
import classes from "./AnimatedDownArrow.module.css";

const AnimatedDownArrow = () => {
  return (
    <div className={classes.container}>
      <div className={classes.chevron}></div>
      <div className={classes.chevron}></div>
      <div className={classes.chevron}></div>
    </div>
  );
};

export default AnimatedDownArrow;

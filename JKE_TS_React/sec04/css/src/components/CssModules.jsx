import React from "react";
import classes from "./CssModules.module.scss";

const CssModule = () => {

  // [ return conponent ]
  return (
    <React.Fragment>
      <div className={classes.container}>
        <p className={classes.title}>- CSS Modules -</p>
        <button className={classes.button}>Fight!</button>
      </div>
    </React.Fragment>
  );
};

export default CssModule;
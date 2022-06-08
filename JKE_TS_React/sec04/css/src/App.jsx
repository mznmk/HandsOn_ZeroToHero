import React from "react";
import InlineStyle from "./components/InlineStyle";
import CssModule from "./components/CssModules";
import StyledJsx from "./components/StyledJsx";
import StyledComponents from "./components/StyledComponents";
import Emotion from "./components/Emotion";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <InlineStyle />
        <CssModule />
        <StyledJsx />
        <StyledComponents />
        <Emotion />
      </div>
    </React.Fragment>
  );
}

export default App;

import React from "react";
import { memo } from "react";

const style = {
  width: "100%",
  height: "100px",
  backgroundColor: "khaki"
};

export const ChildArea = memo((props) => {
  // [ expand props ]
  const { open, onClickClose } = props;

  // [ burdening ... ]
  console.log("ChildArea !!")
  const data = [...Array(10000).keys()];
  data.forEach(() => {
    console.log("...")
  });

  // [ return component ]
  return (
    <React.Fragment>
      {open ? (
        <div style={style}>
          <p>子コンポーネント</p>
          <button onClick={onClickClose}>閉じる</button>
        </div>
      ) : null }
    </React.Fragment>
  );
});
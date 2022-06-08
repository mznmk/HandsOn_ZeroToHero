import React from "react";
import { useState, useCallback, useMemo } from "react";
import { ChildArea } from "./components/ChildArea";

const App = () => {
  console.log("App !!");

  // [ state ]
  const [ text, setText] = useState();
  const [ count, setCount ] = useState(0);
  const [ open , setOpen ] = useState(false);

  // [ event ]
  const onChange = (event) => {
    setText(event.target.value);
  };

  const onClick = () => {
    setCount(count + 1);
    setOpen(!open);
  };

  const onClickClose = useCallback(
    () => {
      setOpen(false);
    },
    []
  );

  const microSum = useMemo(
    () => {
      console.log("UseMemo !!")
      return 1 + 2 + 3
    },
    []
    // [text]
  );
  console.log(microSum);

  // [ return component ]
  return (
    <React.Fragment>
      <div className="App">
        <h1>rendering</h1>
        <input onChange={onChange}/>
        <p>{count}</p>
        <button onClick={onClick}>表示</button>
        <ChildArea open={open} onClickClose={onClickClose}/>
      </div>
    </React.Fragment>
  );
}

export default App;
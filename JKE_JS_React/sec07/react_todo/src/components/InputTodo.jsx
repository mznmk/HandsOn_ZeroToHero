import React from "react";

export const InputTodo = (props) => {
  // [ expand props ]
  const { todoText, onChange, onClick, disabled } = props;

  // [ create style ]
  const style =  {
    backgroundColor: "#c1ffff",
    width: "400px",
    height: "30px",
    padding: "8px",
    margin: "8px",
    borderRadius: "8px",
  }
  
  // [ return component ]
  return (
    <React.Fragment>
      <div style={style}>
        <input disabled={disabled} placeholder="TODOを入力" value={todoText} onChange={onChange} />
        <button disabled={disabled} onClick={onClick}>追加</button>
      </div>
    </React.Fragment>
  );
};
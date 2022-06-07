import React from "react";

export const CompleteTodo = (props) => {
  // [ expand props ]
  const { todos, onClickBack, onClickDelete } = props;

  // [ create style ]
  const style = {
    backgroundColor: "#ffffe0",
    width: "400px",
    minHeight: "200px",
    padding: "8px",
    margin: "8px",
    borderRadius: "8px",
  }
  
  // [ return component ]
  return (
    <>
      <div style={style}>
        <p className="title">完了したTODO</p>
        <ul>
          {todos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <p>{todo}</p>
                <button onClick={() => onClickBack(index)}>戻す</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
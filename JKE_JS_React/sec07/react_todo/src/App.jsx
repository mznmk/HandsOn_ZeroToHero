import React, { useState } from 'react';
import './styles.css';
import { InputTodo } from './components/InputTodo';
import { IncompleteTodo } from './components/IncompleteTodo';
import { CompleteTodo } from './components/CompleteTodo';

export const App = () => {
  // [ state ]
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // [ create event ]
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    // guard clause
    if (todoText === "") { return; }
    if (incompleteTodos.includes(todoText)) { return; }
    if (completeTodos.includes(todoText)) { return; }
    // add todo
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDeleteIncomplete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const todo = incompleteTodos[index];
    onClickDeleteIncomplete(index);
    const newTodos = [...completeTodos, todo];
    setCompleteTodos(newTodos);
  };

  const onClickDeleteComplete = (index) => {
    const newTodos = [...completeTodos];
    newTodos.splice(index, 1);
    setCompleteTodos(newTodos);
  };

  const onClickBack = (index) => {
    const todo = completeTodos[index];
    onClickDeleteComplete(index);
    const newTodos = [...incompleteTodos, todo];
    setIncompleteTodos(newTodos);
  };

  // [ return component ]
  return (
    <React.Fragment>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {
        (incompleteTodos.length >= 5) 
          &&
        (<p>登録できるTODOは５個までです！</p>)
      }
      <IncompleteTodo
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDeleteIncomplete}
      />
      <CompleteTodo
        todos={completeTodos}
        onClickBack={onClickBack}
        onClickDelete={onClickDeleteComplete}
      />
    </React.Fragment>
  );
};

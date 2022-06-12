import { useState } from "react";
import axios from "axios";
import Todo from "./Todo";
import Text from "./Text";
import UserProfile from "./UserProfile";
import { TodoType } from "./types/todo";
import { User } from "./types/user";

const user: User = {
  name: "白竜",
  // hobbies: ["暴力", "シノギ"]
};

function App() {
  // [ state ]
  const [ todos, setTodos ] = useState<TodoType[]>([]);

  // [ event ]
  const onClickFetchData = () => {
    axios
      .get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTodos(res.data);
      });
  };
  
  // [ return component ]
  return (
    <>
      <div>
        <UserProfile user={user}/>
        <Text color="red" fontSize="18px" />
        <button onClick={onClickFetchData}>データ取得</button>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            userId={todo.userId}
            title={todo.title}
            completed={todo.completed}/>
        ))}
      </div>
    </>
  );
}

export default App;

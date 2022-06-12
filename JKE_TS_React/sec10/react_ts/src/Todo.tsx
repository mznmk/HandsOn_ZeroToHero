import { TodoType } from "./types/todo";

const Todo = (
    // props: Pick<TodoType, "userId" | "title" | "completed">
    props: Omit<TodoType, "id">
  ) => {
  // [ props ]
  const { userId, title, completed = false } = props;
  const completeMark = completed ? "[完]" : "[未]";

  // [ return component ]
  return (
    <>
      <p>{`${completeMark} ${title}(ユーザー:${userId})`}</p>
    </>
  );
};

export default Todo;
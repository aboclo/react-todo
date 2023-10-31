import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList(props) {
  const { todoList } = props;
  return (
    <ul>
      {todoList.map((item) => (
        <TodoListItem key={item.id} title={item.title} />
      ))}
    </ul>
  );
}

export default TodoList;

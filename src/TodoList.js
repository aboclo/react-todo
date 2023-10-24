import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  {
    id: "1",
    title: "Study React",
  },
  {
    id: "2",
    title: "Work",
  },
  {
    id: "3",
    title: "Exercise",
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map((item) => (
        <TodoListItem key={item.id} id={item.id} title={item.title} />
      ))}
    </ul>
  );
}

export default TodoList;

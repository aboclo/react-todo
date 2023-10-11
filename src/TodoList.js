import React from "react";

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
      {todoList.map(function (item) {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
}

export default TodoList;

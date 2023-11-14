import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList(props) {
  const { todoList, onRemoveTodo } = props;
  return (
    <ul>
      {todoList.map((item) => (
        <TodoListItem
          key={item.id}
          title={item.title}
          item={item}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;

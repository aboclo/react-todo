import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";

function TodoList(props) {
  const { todoList, onRemoveTodo } = props;
  return (
    <ul className={style.taskList}>
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

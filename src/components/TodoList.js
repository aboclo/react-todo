import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";

function TodoList(props) {
  const { todoList, onRemoveTodo, onNewEditedTitle } = props;
  return (
    <ul className={style.taskList}>
      {todoList.map((item) => (
        <TodoListItem
          key={item.id}
          title={item.title}
          item={item}
          onRemoveTodo={onRemoveTodo}
          onNewEditedTitle={onNewEditedTitle}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onNewEditedTitle: PropTypes.func,
};

export default TodoList;

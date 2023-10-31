import React from "react";

function TodoListItem(props) {
  const { title } = props;
  return <li>{title}</li>;
}

export default TodoListItem;

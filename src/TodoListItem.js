import React from "react";

function TodoListItem(props) {
  const { title, onRemoveTodo, item } = props;

  const handleRemoveTodo = () => {
    onRemoveTodo(item.id);
  };

  return (
    <li>
      <>
        {title}
        <button type="button" onClick={handleRemoveTodo}>
          Remove
        </button>
      </>
    </li>
  );
}

export default TodoListItem;

import React, { useState } from "react";
import style from "./TodoListItem.module.css";

function TodoListItem(props) {
  const { title, onRemoveTodo, item } = props;
  const [isChecked, setIsChecked] = useState(false);
  /*const [editing, setEditing] = useState(false);*/

  const handleRemoveTodo = () => {
    onRemoveTodo(item.id);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  /*const handleEditing = () => {
    setEditing(true);
  }; */

  return (
    <li className={`${style.listItem} ${isChecked ? style.checked : ""}`}>
      <>
        <div className={style.checkboxAndList}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={style.checkbox}
          />
          {title}
        </div>
        <button
          type="button"
          onClick={handleRemoveTodo}
          className={style.removeButton}
        >
          DEL
        </button>
      </>
    </li>
  );
}

export default TodoListItem;

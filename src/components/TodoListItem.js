import React, { useState } from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

function TodoListItem(props) {
  const { title, onRemoveTodo, item, onNewEditedTitle } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleRemoveTodo = () => {
    onRemoveTodo(item.id);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleEditToggle = () => {
    setEdit(!edit);
    if (!edit) {
      setEditedTitle(title);
    }
  };

  const handleSaveEdit = () => {
    if (editedTitle !== title) {
      onNewEditedTitle(item.id, editedTitle);
    }

    setEdit(false);
  };

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
        </div>
        {edit ? (
          <input
            type="text"
            onChange={(e) => setEditedTitle(e.target.value)}
            value={editedTitle}
          />
        ) : (
          title
        )}
        {edit ? (
          <button
            type="button"
            onClick={handleSaveEdit}
            className={style.saveButton}
          >
            <DoneIcon />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEditToggle}
            className={style.editButton}
          >
            <EditIcon />
          </button>
        )}
        <button
          type="button"
          onClick={handleRemoveTodo}
          className={style.removeButton}
        >
          <DeleteIcon />
        </button>
      </>
    </li>
  );
}

TodoListItem.propTypes = {
  title: PropTypes.string,
  onRemoveTodo: PropTypes.func,
  item: PropTypes.object,
  onNewEditedTitle: PropTypes.func,
};

export default TodoListItem;

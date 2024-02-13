import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./AddTodoForm.module.css";
import PropTypes from "prop-types";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

function AddTodoForm(props) {
  const { onAddTodo, onToggleOrder } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = { title: todoTitle, id: Date.now() };
    onAddTodo(newTodo);
    setTodoTitle("");
  };

  return (
    <>
      <form onSubmit={handleAddTodo} className={style.inputContainer}>
        <div className={style.inputTitle}>
          <InputWithLabel
            id="todoTitle"
            value={todoTitle}
            onInputChange={handleTitleChange}
          >
            Title:
          </InputWithLabel>

          <button type="submit" className={style.addButton}>
            ADD
          </button>
          <div>
            <button
              type="button"
              onClick={onToggleOrder}
              className={style.toggleButton}
            >
              <SortByAlphaIcon />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
  onToggleOrder: PropTypes.func,
};

export default AddTodoForm;

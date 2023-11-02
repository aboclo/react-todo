import React, { useState } from "react";

function AddTodoForm(props) {
  const { onAddTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    const objectForm = { title: todoTitle, id: Date.now() };
    onAddTodo(objectForm);
    setTodoTitle("");
  };
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title: </label>
        <input
          id="todoTitle"
          name="title"
          value={todoTitle}
          onChange={handleTitleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;

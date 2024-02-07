import React from "react";
import { Link } from "react-router-dom";
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={style.backgroundStyle}>
      <h1 className={style.welcomeTitle}>Welcome to...</h1>
      <h1 className={style.mainTitle}>Todo List App</h1>
      <p className={style.body}>
        Your daily planner, the place to keep track of ALL of your to-dos. Get
        started now!
      </p>
      <Link to="/TodoList">
        <button className={style.TodoButton}>Todo List App</button>
      </Link>
    </div>
  );
};

export default HomePage;

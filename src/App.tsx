import React from "react";
import styles from "./App.module.scss";
import Categories from "./categories/Categories";

const App: React.FC = () => {
  return (
    <>
      <header>
        <span className={styles.logoText}>The Meal DB</span>
      </header>
      <main>
        <Categories></Categories>
      </main>
    </>
  );
};

export default App;

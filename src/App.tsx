import React from "react";
import styles from "./App.module.scss";
import Categories from "./categories/Categories";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <span className={styles.logoText}>The Meal DB</span>
      </header>
      <main>
        <Categories></Categories>
      </main>
    </Router>
  );
};

export default App;

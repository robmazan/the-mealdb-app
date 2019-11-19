import React from "react";
import styles from "./App.module.scss";
import Categories from "./categories/Categories";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Category from "./categories/Category";

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <Link to="/" className={styles.logoText}>
          The Meal DB
        </Link>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Categories />
          </Route>
          <Route path="/category/:categoryName">
            <Category />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;

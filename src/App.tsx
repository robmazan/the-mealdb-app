import React, { Suspense } from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Categories = React.lazy(() => import("./categories/Categories"));
const Category = React.lazy(() => import("./categories/Category"));

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <Link to="/" className={styles.logoText}>
          The Meal DB
        </Link>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <Categories />
            </Route>
            <Route path="/category/:categoryName">
              <Category />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;

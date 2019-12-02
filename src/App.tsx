/* istanbul ignore file */
// Leaving out of coverage as lazy loading messing up the stats
import React, { Suspense } from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const Categories = React.lazy(() => import("./categories/Categories"));
const Category = React.lazy(() => import("./categories/Category"));
const Meal = React.lazy(() => import("./meal/Meal"));

const App: React.FC = () => {
  return (
    <Router>
      <header className={styles.header}>
        <Link to="/" className={styles.logoText}>
          The Meal DB
        </Link>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Switch>
              <Route exact path="/">
                <Categories />
              </Route>
              <Route path="/category/:categoryName">
                <Category />
              </Route>
              <Route path="/meal/:mealId">
                <Meal />
              </Route>
            </Switch>
          </ErrorBoundary>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;

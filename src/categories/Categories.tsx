import React from "react";
import { useCategories } from "../api/theMealDb";
import { LoadingState } from "../shared/useFetch";
import styles from "./Categories.module.scss";
import Thumbnail from "./Thumbnail";
import Spinner from "../shared/Spinner";
import Center from "../shared/Center";

const Categories: React.FC = () => {
  const [categories, loadingState, loadError] = useCategories();

  document.title = "The Meal DB: Categories";

  switch (loadingState) {
    case LoadingState.DONE:
      return (
        <>
          <h2 className={styles.pageTitle}>Categories</h2>
          <ul className={styles.list}>
            {categories!.map(category => (
              <li key={category.idCategory} className={styles.listItem}>
                <Thumbnail
                  to={`/category/${category.strCategory}`}
                  label={category.strCategory}
                  tooltip={category.strCategoryDescription}
                  imgSrc={category.strCategoryThumb}
                  imgAlt={category.strCategory}
                  imgWidth={200}
                  imgHeight={125}
                />
              </li>
            ))}
          </ul>
        </>
      );

    case LoadingState.ERROR:
      throw loadError;

    case LoadingState.PENDING:
      return (
        <Center>
          <Spinner />
        </Center>
      );
  }
};

export default Categories;

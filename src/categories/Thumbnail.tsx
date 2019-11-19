import React from "react";
import { Link } from "react-router-dom";
import styles from "./Thumbnail.module.scss";

type ThumbnailProps = {
  to: string;
  label: string;
  tooltip?: string;
  imgSrc: string;
  imgAlt: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  to,
  label,
  tooltip,
  imgSrc,
  imgAlt
}) => {
  return (
    <Link className={styles.link} title={tooltip} to={to}>
      <img className={styles.thumb} src={imgSrc} alt={imgAlt} />
      {label}
    </Link>
  );
};

export default Thumbnail;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Thumbnail.module.scss";

type ThumbnailProps = {
  to: string;
  label: string;
  tooltip?: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth?: number;
  imgHeight?: number;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  to,
  label,
  tooltip,
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight
}) => {
  const dimensions = {
    ...(imgWidth ? { width: `${imgWidth}px` } : {}),
    ...(imgHeight ? { height: `${imgHeight}px` } : {})
  };
  return (
    <Link className={styles.link} title={tooltip} to={to}>
      <img className={styles.thumb} src={imgSrc} alt={imgAlt} {...dimensions} />
      {label}
    </Link>
  );
};

export default Thumbnail;

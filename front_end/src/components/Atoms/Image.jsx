import styles from "styles.module.css";

const Image = ({ src, alt }) => {
  return <img src={src} width="222" alt={alt} id={styles.box} />;
};

export default Image;

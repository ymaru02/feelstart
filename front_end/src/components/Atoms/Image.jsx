import styles from "styles.module.css";

const Image = (props) => {
  return <img src={props.url} width="222" alt={props.exp} id={styles.back} />;
};

export default Image;

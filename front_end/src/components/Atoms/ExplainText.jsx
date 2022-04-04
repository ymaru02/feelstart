import styles from "styles.module.css";

const Image = ({ head, texts }) => {
  return (
    <div className={styles.gold}>
      <h3>{head}</h3>
      {texts.map((text, index) => {
        return <p key={index}>{text}</p>;
      })}
    </div>
  );
};

export default Image;

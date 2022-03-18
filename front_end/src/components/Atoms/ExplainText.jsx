import styles from "styles.module.css";

const Image = ({ h, texts }) => {
  return (
    <div className={styles.gold}>
      <h3>{h}</h3>
      {texts.map((text, index) => {
        return <p key={index}>{text.p}</p>;
      })}
    </div>
  );
};

export default Image;

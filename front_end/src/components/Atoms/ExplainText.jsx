import styles from "styles.module.css";

// const Item = ({text}) => {
//   return text;
// }

const Image = ({ h, p }) => {
  return (
    <div className={styles.gold}>
      <h3>{h}</h3>
      {p}
    </div>
  );
};

export default Image;

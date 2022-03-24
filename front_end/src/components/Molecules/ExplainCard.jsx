import Image from "components/Atoms/Image";
import ExplainText from "components/Atoms/ExplainText";
import Box from "@mui/material/Box";
import styles from "styles.module.css";

const ExplainCard = ({ src, alt, head, texts }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="calc(var(--app-height) - 64px - 59px - 35px)"
    >
      <Box
        flexGrow="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={src} width={222} alt={alt} />
      </Box>
      <Box padding="1vh" id={styles.indigo}>
        <ExplainText head={head} texts={texts} />
      </Box>
    </Box>
  );
};

export default ExplainCard;

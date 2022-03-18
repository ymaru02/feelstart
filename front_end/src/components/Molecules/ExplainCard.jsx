import Image from "components/Atoms/Image";
import ExplainText from "components/Atoms/ExplainText";
import Box from "@mui/material/Box";
import styles from "styles.module.css";

const ExplainCard = ({ src, alt, h, texts }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <Box
        flexGrow="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={src} alt={alt} />
      </Box>
      <Box padding="1vh" id={styles.indigo}>
        <ExplainText h={h} texts={texts} />
      </Box>
    </Box>
  );
};

export default ExplainCard;

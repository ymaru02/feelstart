import Image from "components/Atoms/Image";
import ExplainText from "components/Atoms/ExplainText";

const ExplainCard = ({ src, alt, h, p }) => {
  return (
    <div>
      <Image src={src} alt={alt} />
      <ExplainText h={h} p={p} />
    </div>
  );
};

export default ExplainCard;

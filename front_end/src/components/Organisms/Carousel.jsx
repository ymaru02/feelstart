import Slider from "react-slick";
import "slick.css";
import "slick-theme.css";
import ExplainCard from "components/Molecules/ExplainCard";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <ExplainCard
        src="https://img.icons8.com/nolan/344/home-page.png"
        alt="test"
        h="당신의 감정을 기록해 보세요"
        texts={[
          { p: "당신이 갔던 장소" },
          { p: "당신이 기억하는 그 곳" },
          { p: "그때 그 감정을 기록해보세요" },
        ]}
      />
      <ExplainCard
        src="https://img.icons8.com/nolan/344/home-page.png"
        alt="test"
        h="당신의 감정을 기록해 보세요"
        texts={[
          { p: "당신이 갔던 장소" },
          { p: "당신이 기억하는 그 곳" },
          { p: "그때 그 감정을 기록해보세요" },
        ]}
      />
    </Slider>
  );
};

export default Carousel;

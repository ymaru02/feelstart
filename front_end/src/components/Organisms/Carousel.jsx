import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExplainCard from "components/Molecules/ExplainCard";
import "./Carousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <ExplainCard
        src="https://img.icons8.com/nolan/344/speech-bubble-with-dots.png"
        width="222"
        alt="test"
        head="당신의 감정을 기록해 보세요"
        texts={[
          "당신이 갔던 장소",
          "당신이 기억하는 그 곳",
          "그때 그 감정을 기록해보세요",
        ]}
      />
      <ExplainCard
        src="https://img.icons8.com/nolan/344/star.png"
        width="222"
        alt="test"
        head="감정들을 한 눈에 확인해보세요"
        texts={[
          "누군가와 함께 했을 때의 기쁨",
          "헤어짐의 슬픔",
          "모든 것들을 한 눈에 바라보세요",
        ]}
      />
      <ExplainCard
        src="https://img.icons8.com/nolan/344/constellation.png"
        width="222"
        alt="test"
        head="감정들을 이어보세요"
        texts={[
          "당신이 느꼈던 감정들을 이어",
          "하나의 별자리로 만들고",
          "친구들과 공유해보세요",
        ]}
      />
    </Slider>
  );
};

export default Carousel;

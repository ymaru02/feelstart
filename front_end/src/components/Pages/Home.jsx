import { Link } from "react-router-dom";
import { loginStore } from "Store/loginStore";
import KakaoLoginButton from "components/Atoms/KakaoLoginButton";
import Map from "components/Atoms/Map";
import Image from "components/Atoms/Image";

const Home = () => {
  const { bears } = loginStore();
  return (
    <div>
      <Map />
      <Image url="https://img.icons8.com/nolan/344/home-page.png" src="test" />
      <br />
      <Image url="https://img.icons8.com/nolan/344/home-page.png" src="test" />
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <p>{bears}</p>
      <Link to="/about">소개</Link>
      <br></br>
      <KakaoLoginButton />
    </div>
  );
};

export default Home;

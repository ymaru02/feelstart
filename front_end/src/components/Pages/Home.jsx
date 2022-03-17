import { Link } from "react-router-dom";
import { loginStore } from "Store/loginStore";
import KakaoLoginButton from "components/Atoms/KakaoLoginButton";
// import Map from "components/Atoms/Map";
import ExplainCard from "components/Molecules/ExplainCard";

const Home = () => {
  const { bears } = loginStore();
  return (
    <div>
      {/* <Map /> */}
      <ExplainCard
        src="https://img.icons8.com/nolan/344/home-page.png"
        alt="test"
        h="당신의 감정을 기록해 보세요"
        p={[
          "당신이 갔던 장소",
          <br />,
          "당신이 기억하는 그 곳",
          <br />,
          "그때 그 감정을 기록해보세요",
        ]}
      />
      <div style={{ width: "100vh", height: "50vh", background: "black" }}>
        test
      </div>
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

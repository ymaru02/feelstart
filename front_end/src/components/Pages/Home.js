import { Link } from 'react-router-dom';
import { loginStore } from 'Store/loginStore';
import KakaoLoginButton from 'components/Atoms/KakaoLoginButton'
import Map from 'components/Atoms/Map'

const Home = () => {
  const { bears } = loginStore();
  return (
    <div>
      <Map />
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <p>{ bears }</p>
      <Link to="/about">소개</Link>
      <br></br>
      <KakaoLoginButton />
    </div>
  );
};

export default Home;
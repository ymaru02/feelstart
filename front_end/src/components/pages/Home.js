import { Link } from 'react-router-dom';
import { useStore } from 'Store/useStore';

const Home = () => {
  const { bears } = useStore();
  return (
    <div>
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <p>{ bears }</p>
      <Link to="/about">소개</Link>
    </div>
  );
};

export default Home;
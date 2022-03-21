import { Link } from "react-router-dom";
import { useStore } from "Store/useStore";

const About = () => {
  const { bears, increasePopulation, removeAllBears } = useStore();
  return (
    <div>
      <h1>소개</h1>
      <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>

      <p>zustand 테스트: {bears}</p>

      <button
        onClick={() => {
          increasePopulation();
        }}
      >
        증가 버튼
      </button>

      <button
        onClick={() => {
          removeAllBears();
        }}
      >
        초기화 버튼
      </button>

      <Link to="/">홈으로</Link>
      <br />

      <Link to="/">Map으로</Link>
    </div>
  );
};

export default About;

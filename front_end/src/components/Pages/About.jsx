import { Link } from 'react-router-dom';
import { loginStore } from 'Store/loginStore'

const About = () => {
  const { bears, increasePopulation, removeAllBears } = loginStore();
  return (
    <div>
      <h1>소개</h1>
      <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
      
      <p>zustand 테스트: { bears }</p>
      { bears
        ? <p>T</p>
        : <p>F</p>
      }
      
      <button onClick={() => {
        increasePopulation();
      }}>증가 버튼</button>

      <button onClick={() => {
        removeAllBears();
      }}>초기화 버튼</button>

      <Link to="/">홈으로</Link>
    </div>
  );
};



export default About;
const KakaoLoginButton = () => {
  return (
    <img
      src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
      width="222"
      alt="카카오 로그인 버튼"
      onClick={() => {
        window.Kakao.init("1e8a776ec22fd0574e6fbbd4b934a3c5");
        const params = {
          redirectUri: "https://j6b205.p.ssafy.io:3000/kakaocallback",
        };
        window.Kakao.Auth.authorize(params);
      }}
    />
  );
};

export default KakaoLoginButton;

import axios from "axios";

const KakaoLoginRequest = async () => {
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response = await axios.post("/account/kakaologinrequest", {
      code: code,
    });
    console.log(response);
    return (
      <div>
        {code}
        <br />
        {response}
      </div>
    );
  } catch (err) {
    console.log(err);
  }
  return <div>ERR</div>;
};

const KakaoCallback = () => {
  const result = KakaoLoginRequest();
  return <p>TEST</p>;
};

export default KakaoCallback;

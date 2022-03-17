import axios from "axios";

const KakaoCallback = async () => {
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response = await axios.post("/account/kakaologinrequest", {
      code: code,
    });
    return (
      <div>
        {code}
        <br />
        {response}
      </div>
    );
  } catch (err) {
    console.log("ERR:", err);
  }
  return <div>FAIL</div>;
};

export default KakaoCallback;

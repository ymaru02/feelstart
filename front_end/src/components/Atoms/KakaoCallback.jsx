import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginStore } from "Store/loginStore";

const KakaoLoginRequest = async () => {
  const { setLoginData, setUserName } = loginStore();
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response = await axios.post("/api/account/kakaologinrequest", {
      code: code,
    });
    setLoginData(response.data.jwt_token, response.data.user_id);

    const res = await axios.get(`/api/users/${response.data.user_id}`, {
      headers: {
        Authorization: `Bearer ${response.data.jwt_token}`,
      },
    });
    setUserName(res.data.nickname);
  } catch (err) {
    console.log(err);
  }
};

const KakaoCallback = () => {
  KakaoLoginRequest();

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/content", { replace: true });
  });

  return null;
};

export default KakaoCallback;

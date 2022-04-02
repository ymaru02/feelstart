import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginStore } from "Store/loginStore";
import { useCookies } from "react-cookie";

const KakaoLoginRequest = async () => {
  const { setLoginData } = loginStore();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response = await axios.post("/account/kakaologinrequest", {
      code: code,
    });
    setCookie(response.data.jwt_token);
    setLoginData(response.data.user_id);
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

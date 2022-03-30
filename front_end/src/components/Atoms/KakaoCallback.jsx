import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginStore } from "Store/loginStore";

const KakaoLoginRequest = async () => {
  const { setLoginData } = loginStore();

  const code = new URL(window.location.href).searchParams.get("code");
  axios
    .post("/account/kakaologinrequest", {
      code: code,
    })
    .then((response) => {
      console.log(response);
      setLoginData(response.data.access_token, response.data.user_id);
    })
    .catch((e) => console.log(e));
  // console.log(response);

  // console.log(response);
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

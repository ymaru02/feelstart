import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

let ans = false;

const KakaoLoginRequest = async () => {
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response = await axios.post("/account/kakaologinrequest", {
      code: code,
    });
    console.log(response);
    ans = true;
    return "YES";
  } catch (err) {
    console.log(err);
  }
  return "NO";
};

const KakaoCallback = () => {
  KakaoLoginRequest();

  const navigate = useNavigate();
  useEffect(() => {
    if (!ans) navigate("/", { replace: true });
  });

  return null;
};

export default KakaoCallback;

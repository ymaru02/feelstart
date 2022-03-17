package com.b205.gambyeol.users.controller;

import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.dto.LoginResponseDto;
import com.b205.gambyeol.users.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
@RequestMapping("/account")
public class UsersController {

    @Autowired
    private UsersService userService;

    @PostMapping("/kakaologin")
    public ResponseEntity<LoginResponseDto> kakaoLoginRequest(final String code) throws IOException, JSONException {

        String accessToken=getReturnAccessToken(code); // 액세스 코드를 가져온다
        System.out.println("accessToken: "+accessToken);

        if(accessToken==null){ // 액세스 토큰을 얻어올 수 없는 경우
            return ResponseEntity.badRequest().body(null);
        }

        String apiUrl="https://kapi.kakao.com/v2/user/me";
        String headerStr="Bearer"+accessToken;
        String res=requestToServer(apiUrl, headerStr);

        if(res==null){
            System.out.println("res is null");
        }
        if(res!=null){
            JSONObject jObj=new JSONObject(res);
            Long kakaoId=jObj.getLong("id");
            String nickname = jObj.getJSONObject("kakao_account").getJSONObject("profile").getString("nickname");
            String profileImg = jObj.getJSONObject("kakao_account").getJSONObject("profile").getString("profile_image_url");

            System.out.println("카카오 아이디: "+kakaoId);
            System.out.println("카카오 닉네임: "+nickname);
            System.out.println("카카오 프로필: "+profileImg);

            Users user=userService.findUserByKakaoId(kakaoId, nickname, profileImg);

            LoginResponseDto responseDto = LoginResponseDto.builder()
                    .access_token(accessToken)
                    .user_id(user.getUserId())
                    .build();

            return ResponseEntity.ok().body(responseDto);
        }

       return ResponseEntity.ok().body(null);
    }

    public String getReturnAccessToken(String code) {

        String access_token = "";
        String refresh_token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //HttpURLConnection 설정 값 셋팅
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);


            // buffer 스트림 객체 값 셋팅 후 요청
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=70fdaeceaade72a04f3cb9a76a7ecfe2");  //앱 KEY VALUE
            sb.append("&redirect_uri=http://localhost:3000/kakaocallback"); // 앱 CALLBACK 경로
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();
            System.out.println(sb.toString()); // 디버깅

            //  RETURN 값 result 변수에 저장
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String br_line = "";
            String result = "";

            while ((br_line = br.readLine()) != null) {
                result += br_line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            // 토큰 값 저장 및 리턴
            access_token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_token = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_token;
    }

    /**
     * 서버 통신 메소드
     * @param apiURL
     * @param headerStr
     * @return
     * @throws IOException
     */
    private String requestToServer(String apiURL, String headerStr) throws IOException {
        URL url = new URL(apiURL);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setRequestMethod("GET");

        if(headerStr != null && !headerStr.equals("") ) {
            con.setRequestProperty("Authorization", headerStr);
        }

        int responseCode = con.getResponseCode();
        BufferedReader br;

        if(responseCode == 200) { // 정상 호출
            br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        }
        else {  // 에러 발생
            System.out.println("responseCode 에러 발생: "+responseCode);
            br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            System.out.println(br.toString());
        }

        String inputLine;
        StringBuilder res = new StringBuilder();

        while ((inputLine = br.readLine()) != null) {
            res.append(inputLine);
        }

        br.close();

        if(responseCode==200) {
            return res.toString();
        } else {
            return null;
        }
    }

}

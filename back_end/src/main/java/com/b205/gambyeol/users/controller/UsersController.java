package com.b205.gambyeol.users.controller;

import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.dto.LoginResponseDto;
import com.b205.gambyeol.users.security.TokenProvider;
import com.b205.gambyeol.users.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.json.JSONObject;

@Slf4j
@Controller
@RequestMapping("/api/account")
public class UsersController {

    @Autowired
    private UsersService userService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/kakaologinrequest")
    public ResponseEntity<LoginResponseDto> kakaoLoginRequest(@RequestBody Map<String,String> map) throws IOException, JSONException {
        System.out.println("<<<<<<<<요청 구별용: 요청 1>>>>>>>>"+ LocalDateTime.now());
        System.out.println("액세스 코드 가져옴, code: " + map.get("code"));
        String accessToken=getReturnAccessToken(map.get("code")); // 액세스 코드를 가져온다

        if(accessToken==null){ // 액세스 토큰을 얻어올 수 없는 경우
            System.out.println("액세스 토큰이 null이다");
            return ResponseEntity.badRequest().body(null);
        }

        String apiUrl="https://kapi.kakao.com/v2/user/me";
        String headerStr="Bearer "+accessToken;
        String res=requestToServer(apiUrl, headerStr);

        System.out.println("res: "+res);

        if(res==null){
            System.out.println("res");
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

            // 토큰 생성
            final String token=tokenProvider.create(user);

            // 응답 json 만들기
            LoginResponseDto responseDto = LoginResponseDto.builder()
                    .jwt_token(token)
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
            sb.append("&code=" + code);
//            sb.append("&redirect_uri=https://j6b205.p.ssafy.io/kakaocallback"); // 앱 CALLBACK 경로
            sb.append("&redirect_uri=http://localhost:3000/kakaocallback");

            bw.write(sb.toString());
            bw.flush();
            System.out.println(sb.toString()); // 디버깅

            //  RETURN 값 result 변수에 저장
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream())); // 에러
            String br_line = "";
            String result = "";

            while ((br_line = br.readLine()) != null) {
                result += br_line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            System.out.println("kauth 요청 결과 result: "+result);

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
        } else {  // 에러 발생
            br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
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
            System.out.println(res.toString());
            return null;
        }
    }

}

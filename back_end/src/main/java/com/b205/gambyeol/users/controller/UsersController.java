package com.b205.gambyeol.users.controller;

import com.b205.gambyeol.users.domain.Follow;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.dto.LoginResponseDto;
import com.b205.gambyeol.users.dto.UserProfileDto;
import com.b205.gambyeol.users.security.TokenProvider;
import com.b205.gambyeol.users.service.FollowService;
import com.b205.gambyeol.users.service.UsersService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Map;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.json.JSONObject;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
@RequestMapping("/api")
public class UsersController {

    @Autowired
    private UsersService userService;

    @Autowired
    private FollowService followService;

    @Autowired
    private TokenProvider tokenProvider;


    @PostMapping("/account/kakaologinrequest")
    public ResponseEntity<LoginResponseDto> kakaoLoginRequest(@RequestBody Map<String,String> map) throws Exception {
        HttpServletRequest request =
                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

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

            Users user = userService.findUserByKakaoId(kakaoId, nickname, profileImg);

            // 로그인 로그내역 저장
            Map<String, Object> broswserInfo = broswserInfo(request);
            System.out.println("접속 broswserInfo : "+broswserInfo);
            userService.logSave(broswserInfo, user.getUserId());

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

    @GetMapping("users/{id}")
    public ResponseEntity findById(@PathVariable final long id) {
        return ResponseEntity.ok(userService.findById(id));
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

    /**
     * 로그인 정보 로그 관련 정보처리
     * @param request
     * @return
     * @throws Exception
     */
    public static Map<String, Object> broswserInfo(HttpServletRequest request) {
        String agent = request.getHeader("USER-AGENT");

        String os = getClientOS(agent);
        String broswser = getClientBrowser(agent);
        String ip = getUserIp(request);

        Map<String, Object> map = new HashMap<String, Object>();

        map.put("ip", ip);
        map.put("header", agent);
        map.put("os", os);
        map.put("broswser", broswser);

        return map;
    }


    public static String getClientOS(String userAgent) {
        String os = "";
        userAgent = userAgent.toLowerCase();
        if (userAgent.indexOf("windows nt 10.0") > -1) {
            os = "Windows10";
        }else if (userAgent.indexOf("windows nt 6.1") > -1) {
            os = "Windows7";
        }else if (userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows nt 6.3") > -1 ) {
            os = "Windows8";
        }else if (userAgent.indexOf("windows nt 6.0") > -1) {
            os = "WindowsVista";
        }else if (userAgent.indexOf("windows nt 5.1") > -1) {
            os = "WindowsXP";
        }else if (userAgent.indexOf("windows nt 5.0") > -1) {
            os = "Windows2000";
        }else if (userAgent.indexOf("windows nt 4.0") > -1) {
            os = "WindowsNT";
        }else if (userAgent.indexOf("windows 98") > -1) {
            os = "Windows98";
        }else if (userAgent.indexOf("windows 95") > -1) {
            os = "Windows95";
        }else if (userAgent.indexOf("iphone") > -1) {
            os = "iPhone";
        }else if (userAgent.indexOf("ipad") > -1) {
            os = "iPad";
        }else if (userAgent.indexOf("android") > -1) {
            os = "android";
        }else if (userAgent.indexOf("mac") > -1) {
            os = "mac";
        }else if (userAgent.indexOf("linux") > -1) {
            os = "Linux";
        }else{
            os = "Other";
        }
        return os;
    }


    public static String getClientBrowser(String userAgent) {
        String browser = "";

        if (userAgent.indexOf("Trident/7.0") > -1) {
            browser = "ie11";
        }
        else if (userAgent.indexOf("MSIE 10") > -1) {
            browser = "ie10";
        }
        else if (userAgent.indexOf("MSIE 9") > -1) {
            browser = "ie9";
        }
        else if (userAgent.indexOf("MSIE 8") > -1) {
            browser = "ie8";
        }
        else if (userAgent.indexOf("Chrome/") > -1) {
            browser = "Chrome";
        }
        else if (userAgent.indexOf("Chrome/") == -1 && userAgent.indexOf("Safari/") >= -1) {
            browser = "Safari";
        }
        else if (userAgent.indexOf("Firefox/") >= -1) {
            browser = "Firefox";
        }
        else {
            browser ="Other";
        }
        return browser;
    }


    public static String getUserIp(HttpServletRequest request) {

        String ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-RealIP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("REMOTE_ADDR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

    /**
     * fromUserId를 가진 user가 toUserId를 가진 user를 팔로우 하는 정보를 추가
     * @param id 팔로우 당하는 유저의 id
     * @param userId
     * @return
     */
    @PostMapping("/follow")
    public ResponseEntity followUser(@RequestBody final long id, @AuthenticationPrincipal long userId) {
        return ResponseEntity.ok(followService.save(id, userId));
    }

    @DeleteMapping("/follow")
    public ResponseEntity unFollowUser(@RequestBody final long id, @AuthenticationPrincipal long userId) {
        return ResponseEntity.ok(followService.findFollowByUser(id, userId));
    }

//    @GetMapping("/user/profile/{id}")
//    public ResponseEntity profile(@RequestParam final long id, @AuthenticationPrincipal long userId) {
//        UserProfileDto userProfileDto = userService.getProfile(id, userId);
//
//    }

}

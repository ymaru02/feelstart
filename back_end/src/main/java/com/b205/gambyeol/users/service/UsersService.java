package com.b205.gambyeol.users.service;

import com.b205.gambyeol.log.domain.LoginUserInfoRepository;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.log.domain.LoginUserInformation;
import com.b205.gambyeol.users.domain.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsersService {

    private final LoginUserInfoRepository loginLogRepository;

    @Autowired
    private UsersRepository usersRepository;

    // 입력된 카카오 id를 가진 유저를 찾아내는 메소드
    public Users findUserByKakaoId(final Long kakaoId, final String nickname, final String profileImg){
        Users user = usersRepository.findKakaoUserEntityByKakaoId(kakaoId);

        // 가입되어 있지 않은 회원인 경우 가입시키고 회원 객체를 가져온다
        if(user==null) {
            user=joinUser(kakaoId, nickname, profileImg);
        }

        // 사용자의 닉네임이 변경되었을 경우 반영
        if(!user.getNickname().equals(nickname)) {
            user.setNickname(nickname);
        }

        // 사용자의 프로필 사진이 변경되었을 경우 반영
        if(!user.getProfile().equals(profileImg)){
            user.setProfile(profileImg);
        }

        return user;
    }

    // 회원가입 시키는 메소드
    public Users joinUser(final Long kakaoId, final String nickname, final String profileImg){

        Users user = Users.builder()
                .kakaoId(kakaoId)
                .nickname(nickname)
                .profile(profileImg)
                .build();

        return usersRepository.save(user); //DB에 넣어주고 리턴
    }

    // 로그인 관련 로그 DB에 저장하는 메소드
    public LoginUserInformation logSave(@NotNull Map<String, Object> params, long userId) {
        System.out.println(params.get("ip"));
        LoginUserInformation log = LoginUserInformation.builder()
                .loginIp(params.get("ip").toString())
                .accessOs(params.get("os").toString())
                .accessBrowser(params.get("broswser").toString())
                .userId(userId)
                .loginUserDatetime(LocalDateTime.now())
                .build();

        return loginLogRepository.save(log); //DB에 넣어주고 리턴
    }
}

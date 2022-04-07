package com.b205.gambyeol.users.service;

import com.b205.gambyeol.log.domain.LoginUserInfoRepository;
import com.b205.gambyeol.users.domain.Follow;
import com.b205.gambyeol.users.domain.FollowRepository;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.log.domain.LoginUserInformation;
import com.b205.gambyeol.users.domain.UsersRepository;
import com.b205.gambyeol.users.dto.UserProfileDto;
import com.b205.gambyeol.users.dto.UsersDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsersService {

    @Autowired
    private final LoginUserInfoRepository loginLogRepository;
    @Autowired
    private final FollowRepository followRepository;

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
        LoginUserInformation log = LoginUserInformation.builder()
                .loginIp(params.get("ip").toString())
                .accessOs(params.get("os").toString())
                .accessBrowser(params.get("broswser").toString())
                .userId(userId)
                .loginUserDatetime(LocalDateTime.now())
                .build();

        return loginLogRepository.save(log); //DB에 넣어주고 리턴
    }

    public UsersDto findById(final Long id) {
        Users entity = usersRepository.findByUserId(id);
        return new UsersDto(entity);
    }

//    @Transactional
//    public UserProfileDto getProfile(final Long targetId, long userId) {
//        UserProfileDto userProfileDto = new UserProfileDto();
//        Users targetUser = usersRepository.getById(targetId);
//        UsersDto entity = findById(targetId);
//        userProfileDto.setUsersDto(entity);
//
//        // userId를 활용해 targetId가 로그인된 사용자인지 확인
//        Users loginUser = usersRepository.findByUserId(userId);
//        userProfileDto.setLoginUser(loginUser.getUserId() == targetUser.getUserId());
//        userProfileDto.setLoginId(loginUser.getUserId());
//
//        // targetId를 가진 user가 userId를 가진 user를 구독했는지 확인
//        userProfileDto.setFollow(followRepository.findFollowByFromUserAndToUser());
//
//        return userProfileDto;
//    }

    @Transactional
    public UserProfileDto getProfile(Long userId, Long loginId){

        Users profileUser=usersRepository.findByUserId(userId); // 프로필 주인

        // 로그인한 사용자의 프로필 페이지인지 확인
        boolean isLoginUser=(userId==loginId)?true:false;

        boolean follow=false;
        Follow isFollowed = followRepository.findByFromUserAndToUser(usersRepository.findByUserId(loginId), profileUser);
        if(isFollowed!=null) follow=true;

        UsersDto usersDto=new UsersDto(profileUser); // 프로필 주인 정보
        int userFollowerCount = followRepository.findByToUser(profileUser).size();
        int userFollowingCount = followRepository.findByFromUser(profileUser).size();

        UserProfileDto userProfileDto = UserProfileDto.builder()
                .loginId(loginId)
                .loginUser(isLoginUser)
                .follow(follow)
                .usersDto(usersDto)
                .userFollowerCount(userFollowerCount)
                .userFollowingCount(userFollowingCount)
                .build();

        return userProfileDto;

    }

}

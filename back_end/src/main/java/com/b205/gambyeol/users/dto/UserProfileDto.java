package com.b205.gambyeol.users.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
public class UserProfileDto {
    private long loginId;
    private boolean loginUser;  // 현재 프로필 페이지가 로그인한 사용자의 프로필인지 확인
    private boolean follow;     // 현재 프로필 페이지의 사용자를 팔로우한 상태인지를 의미
    private UsersDto usersDto;  // 프로필 페이지의 사용자 정보를 담는 객체
    private int userFollowerCount;  // 팔로워 개수
    private int userFollowingCount; // 팔로잉 개수
}

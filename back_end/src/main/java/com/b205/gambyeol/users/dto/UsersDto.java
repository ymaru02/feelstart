package com.b205.gambyeol.users.dto;

import com.b205.gambyeol.users.domain.Users;
import lombok.Getter;


@Getter
public class UsersDto {
    private Long userId;
    private String nickname; // 닉네임
    private String profile; // 프로필 이미지

    public UsersDto(Users entity) {
        this.userId = entity.getUserId();
        this.nickname = entity.getNickname();
        this.profile = entity.getProfile();
    }
}

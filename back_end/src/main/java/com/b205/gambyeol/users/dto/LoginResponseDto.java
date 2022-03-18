package com.b205.gambyeol.users.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginResponseDto {

    private String jwt_token; // 사용자 정보가 담긴 토큰
    private Long user_id; // 사용자 아이디

}

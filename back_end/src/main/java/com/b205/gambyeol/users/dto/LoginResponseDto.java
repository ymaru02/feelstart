package com.b205.gambyeol.users.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginResponseDto {

    private String access_token; // 액세스 토큰
    private Long user_id; // 사용자 아이디

}

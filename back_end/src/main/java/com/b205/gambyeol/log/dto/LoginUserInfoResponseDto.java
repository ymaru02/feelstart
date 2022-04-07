package com.b205.gambyeol.log.dto;

import com.b205.gambyeol.log.domain.LoginUserInformation;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LoginUserInfoResponseDto {
    private Long loginLogId; // 로그인 로그 아이디
    private String loginIp; // 로그인 ip
    private String accessOs; // 접속한 운영체제(OS)
    private String accessBrowser; // 접속한 브라우저
    private Long userId; // 접속한 사용자의 카카오Id
    private LocalDateTime loginUserDatetime; // 접속한 날짜와 시간

    public LoginUserInfoResponseDto(LoginUserInformation entity) {
        this.loginLogId = entity.getLoginLogId();
        this.loginIp = entity.getLoginIp();
        this.accessOs = entity.getAccessOs();
        this.accessBrowser = entity.getAccessBrowser();
        this.userId = entity.getUserId();
        this.loginUserDatetime = entity.getLoginUserDatetime();
    }
}

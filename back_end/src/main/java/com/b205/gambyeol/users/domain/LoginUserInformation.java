package com.b205.gambyeol.users.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor // 매개변수가 없는 생성자
@AllArgsConstructor // 모든 인자를 매개변수로 받는 생성자
public class LoginUserInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loginLogId; // 로그인 로그 아이디

    @Column
    private String loginIp; // 로그인 ip

    @Column
    private String accessOs; // 접속한 운영체제(OS)

    @Column
    private String accessBrowser; // 접속한 브라우저

    @Column
    private Long kakaoId; // 접속한 사용자의 카카오Id

    @Column
    private LocalDateTime loginUserDatetime; // 접속한 날짜와 시간
}

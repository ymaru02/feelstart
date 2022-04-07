package com.b205.gambyeol.users.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor // 매개변수가 없는 생성자
@AllArgsConstructor // 모든 인자를 매개변수로 받는 생성자
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId; // 사용자 아이디

    @Column
    private Long kakaoId; // 카카오 아이디

    @Column
    private String nickname; // 닉네임

    @Column
    private String profile; // 프로필 이미지


}

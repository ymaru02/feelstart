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
    private Long userId;

    @Column
    private Long kakaoId;

    @Column
    private String nickname;

    @Column
    private String profile;

}

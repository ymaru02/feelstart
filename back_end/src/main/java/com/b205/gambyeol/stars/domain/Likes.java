package com.b205.gambyeol.stars.domain;

import com.b205.gambyeol.users.domain.Users;

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
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likesId;    // like PK

    @Column
    private Boolean mark;    // 좋아요 (true:좋아요, false:좋아요 취소)

    @ManyToOne(fetch = FetchType.LAZY)
    private Users user; // 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    private Star star; // 본 글
}

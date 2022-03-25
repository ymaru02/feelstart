package com.b205.gambyeol.stars.domain;


import com.b205.gambyeol.users.domain.Users;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor // 매개변수가 없는 생성자
@AllArgsConstructor // 모든 인자를 매개변수로 받는 생성자
public class Star {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long starId; // 별 PK

    @Column
    private String content; // 내용

    @Column
    private LocalDateTime date; // 작성 일자

    @Column
    private String imageUrl; // 이미지 url

    @Column
    private double latitude; // 위도

    @Column
    private double longitude; // 경도

    @Column
    private String addr; // 주소

    @Column @Enumerated(EnumType.STRING)
    private Emotions mood; // 기분(HAPPY, NORMAL, SAD, ANGRY)


    @ManyToOne(fetch = FetchType.LAZY)
    private Users user; // 작성자

}

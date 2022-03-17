package com.b205.gambyeol.stars.dto;

import com.b205.gambyeol.stars.domain.Emotions;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.users.domain.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StarRequestDto {
    private String content;
    private String imageUrl; // 이미지 url
    private double latitude; // 위도
    private double longitude; // 경도
    private String addr; // 주소
    private Emotions mood; // 기분(HAPPY, NORMAL, SAD, ANGRY)
    private String writer; // 작성자

    public Star toEntity() {
        return Star.builder()
                .content(content)
                .imageUrl(imageUrl)
                .latitude(latitude)
                .longitude(longitude)
                .addr(addr)
                .mood(mood)
                .writer(writer)
                .build();
    }

//    public void setWriter(Users writer) {
//        this.writer = writer;
//    }

}

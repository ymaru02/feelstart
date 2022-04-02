package com.b205.gambyeol.stars.dto;

import com.b205.gambyeol.stars.domain.Emotions;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.users.domain.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@NoArgsConstructor
public class StarRequestDto {
    private String content;
    private LocalDateTime date;
    private String imageName; // 이미지 url
    private double latitude; // 위도
    private double longitude; // 경도
    private String addr; // 주소
    private Emotions mood; // 기분(HAPPY, NORMAL, SAD, ANGRY)
    private Users user; // 작성자

    public Star toEntity() {
        return Star.builder()
                .content(content)
                .date(LocalDateTime.now())
                .imageName(imageName)
                .latitude(latitude)
                .longitude(longitude)
                .addr(addr)
                .mood(mood)
                .user(user)
                .build();
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public void setImageName(String imageName) { this.imageName = imageName; }

}

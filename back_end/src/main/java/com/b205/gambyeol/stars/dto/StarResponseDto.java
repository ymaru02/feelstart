package com.b205.gambyeol.stars.dto;

import com.b205.gambyeol.stars.domain.Emotions;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.users.domain.Users;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
public class StarResponseDto {

    private Long starId;
    private String content;
    private LocalDateTime date;
    private String imageUrl; // 이미지 url
    private double latitude; // 위도
    private double longitude; // 경도
    private String addr; // 주소
    private Emotions mood; // 기분(HAPPY, NORMAL, SAD, ANGRY)
    private String writer; // 작성자

    public StarResponseDto(Star entity) {
        this.starId = entity.getStarId();
        this.content = entity.getContent();
        this.date = entity.getDate();
        this.imageUrl = entity.getImageUrl();
        this.latitude = entity.getLatitude();
        this.longitude = entity.getLongitude();
        this.addr = entity.getAddr();
        this.mood = entity.getMood();
        this.writer = entity.getUser().getNickname();
    }
}

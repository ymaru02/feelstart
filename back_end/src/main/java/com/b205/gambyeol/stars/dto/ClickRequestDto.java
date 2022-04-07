package com.b205.gambyeol.stars.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ClickRequestDto {

    private long user;
    private double latitude; // 위도
    private double longitude; // 경도
    private String mood; // 주소

}
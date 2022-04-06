package com.b205.gambyeol.stars.dto;

import com.b205.gambyeol.stars.domain.Likes;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.users.domain.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StarLikesRequestDto {
    private Boolean mark;       // 좋아요 (true:좋아요, false:좋아요 취소)
    private Users user; // 작성자
    private Star star; // 본 글

    public Likes toEntity() {
        return Likes.builder()
                .mark(mark)
                .user(user)
                .star(star)
                .build();
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public void setStar(Star star) {
        this.star = star;
    }

}

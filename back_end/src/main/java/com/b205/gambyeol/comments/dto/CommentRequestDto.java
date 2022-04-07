package com.b205.gambyeol.comments.dto;

import com.b205.gambyeol.comments.domain.Comment;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.users.domain.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentRequestDto {
    private String content;
    private LocalDateTime date;
    private Users user;
    private Star star;

    public Comment toEntity() {
        return Comment.builder()
                .content(content)
                .date(LocalDateTime.now())
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

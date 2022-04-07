package com.b205.gambyeol.comments.dto;

import com.b205.gambyeol.comments.domain.Comment;
import com.b205.gambyeol.users.domain.Users;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentResponseDto {

    private Long commentId;
    private String content;
    private LocalDateTime date;
    private String writer;
    private Long starId;

    public CommentResponseDto(Comment entity) {
        this.commentId = entity.getCommentId();
        this.content = entity.getContent();
        this.date = entity.getDate();
        this.writer = entity.getUser().getNickname();
        this.starId = entity.getStar().getStarId();
    }
}

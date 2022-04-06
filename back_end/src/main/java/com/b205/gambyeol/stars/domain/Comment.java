package com.b205.gambyeol.stars.domain;

import com.b205.gambyeol.users.domain.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor // 매개변수가 없는 생성자
@AllArgsConstructor // 모든 인자를 매개변수로 받는 생성자
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;     // 댓글 PK

    @Column
    private String content;     // 댓글내용

    @Column
    private LocalDateTime date; // 작성 일자

    @ManyToOne(fetch = FetchType.LAZY)
    private Users user; // 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    private Star star; // 본 글
}

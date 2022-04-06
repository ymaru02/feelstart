package com.b205.gambyeol.comments.controller;

import com.b205.gambyeol.comments.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 해당게시글의 댓글 전체보기
    @GetMapping("stars/{id}/comments/all")
    public ResponseEntity findAllByStarId(@PathVariable final long id) {
        return  ResponseEntity.ok(commentService.findAllByStarId(id));
    }

}

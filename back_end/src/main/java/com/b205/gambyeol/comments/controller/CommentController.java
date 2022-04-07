package com.b205.gambyeol.comments.controller;

import com.b205.gambyeol.comments.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    @Autowired
    private final CommentService commentService;

    // 해당게시글의 댓글 전체보기
    @GetMapping("/stars/{id}/comments/all")
    public ResponseEntity findAllByStarId(@PathVariable final long id) {
        return  ResponseEntity.ok(commentService.findAllByStarId(id));
    }

    // 해당게시글에 댓글 등록하기
    @PostMapping("/stars/comments")
    public ResponseEntity save(@AuthenticationPrincipal long userId,
                               @RequestBody Map<String,String> map){
        return ResponseEntity.ok(commentService.save(userId, map.get("content"), Long.parseLong(map.get("id"))));
    }

    // 해당게시글에 댓글 삭제하기
    @PostMapping("/stars/comments/del")
    public ResponseEntity delete(@AuthenticationPrincipal long userId,
                                 @RequestBody Map<String,String> map){
        return ResponseEntity.ok(commentService.delete(userId, Long.parseLong(map.get("id"))));
    }
}

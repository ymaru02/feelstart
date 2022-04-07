package com.b205.gambyeol.stars.controller;

import com.b205.gambyeol.stars.dto.StarRequestDto;
import com.b205.gambyeol.stars.service.StarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StarController {

    private final StarService starService;

    @PostMapping("/stars")
    public ResponseEntity save(@RequestPart(value = "dto", required = false) StarRequestDto dto,
                               @AuthenticationPrincipal long userId,
                               @RequestPart(value = "imgFile", required = false) MultipartFile imgFile) {
        return ResponseEntity.ok(starService.save(dto, userId, imgFile));
    }
    
    // 글 전체보기
    @GetMapping("/stars/all")
    public ResponseEntity findAll() {
        return  ResponseEntity.ok(starService.findAll());
    }

    // 해당 userId별 글 모아보기
    @GetMapping("/stars/all/{userId}")
    public ResponseEntity findAllByMyStar(@PathVariable final long userId) {
        return ResponseEntity.ok(starService.findAllByUserId(userId));
    }

    // 좋아요 등록/취소
    @PostMapping("/stars/likes")
    public ResponseEntity likeSave(@RequestParam Boolean mark,
                                   @AuthenticationPrincipal long userId,
                                   @RequestParam final long id) {
        return ResponseEntity.ok(starService.findLikesByStarIdAndUserId(mark, userId, id));
    }

    // 글 상세보기
    @GetMapping("/stars/{id}")
    public ResponseEntity findById(@PathVariable final long id) {
        return ResponseEntity.ok(starService.findById(id));
    }

    // 글 좋아요 조회
    @GetMapping("/stars/{id}/likes")
    public ResponseEntity findLikeAll(@PathVariable final long id, @AuthenticationPrincipal long userId) {
        return  ResponseEntity.ok(starService.findLike(id, userId));
    }

    // 글 좋아요 갯수
    @GetMapping("/stars/{id}/likes/count")
    public ResponseEntity findLikeAll(@PathVariable final long id) {
        return ResponseEntity.ok(starService.countLikes(id));
    }


}

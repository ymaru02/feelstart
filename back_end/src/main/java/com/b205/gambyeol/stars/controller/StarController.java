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
        System.out.println("글 작성 controller 시작");
        System.out.println(dto);
        return ResponseEntity.ok(starService.save(dto, userId, imgFile));
    }

    @GetMapping("stars/all")
    public ResponseEntity findAll() {
        return  ResponseEntity.ok(starService.findAll());
    }


    // 내 글 모아보기
    @GetMapping("stars/myall")
    public ResponseEntity findAllByMyStar(@AuthenticationPrincipal long userId) {
        return ResponseEntity.ok(starService.findAllByUserUserId(userId));
    }

    @GetMapping("stars/{id}")
    public ResponseEntity findById(@PathVariable final long id) {
        return ResponseEntity.ok(starService.findById(id));
    }
}

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

    @GetMapping("stars/all")
    public ResponseEntity findAll() {
        return  ResponseEntity.ok(starService.findAll());
    }

    @GetMapping("stars/{id}")
    public ResponseEntity findById(@PathVariable final long id) {
        return ResponseEntity.ok(starService.findById(id));
    }
}

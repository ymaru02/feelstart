package com.b205.gambyeol.stars.controller;

import com.b205.gambyeol.stars.dto.StarRequestDto;
import com.b205.gambyeol.stars.service.StarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stars")
@RequiredArgsConstructor
public class StarController {

    private final StarService starService;

    @PostMapping("/write")
    public ResponseEntity save(@RequestBody StarRequestDto dto) {
        return ResponseEntity.ok(starService.save(dto));
    }

        @GetMapping("/all")
    public ResponseEntity findAll() {
        return  ResponseEntity.ok(starService.findAll());
    }
}

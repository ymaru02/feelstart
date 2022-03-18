package com.b205.gambyeol.users.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/test")
public class TestController {

    @PostMapping("/testcontroller")
    public ResponseEntity<String> tokenTestMethod(@AuthenticationPrincipal Long userId){

        return ResponseEntity.ok().body("가져와졌음, id: "+userId);
    }
}

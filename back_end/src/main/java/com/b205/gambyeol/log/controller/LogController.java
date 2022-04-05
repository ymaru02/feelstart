package com.b205.gambyeol.log.controller;

import com.b205.gambyeol.log.service.LogService;
import com.b205.gambyeol.users.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/api")
public class LogController {

    @Autowired
    private LogService logService;

    @GetMapping("log/loginAll")
    public ResponseEntity findAll() { return  ResponseEntity.ok(logService.findAll()); }


}

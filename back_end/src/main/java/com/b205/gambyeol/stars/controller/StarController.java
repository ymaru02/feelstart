package com.b205.gambyeol.stars.controller;

import com.b205.gambyeol.stars.dto.ClickRequestDto;
import com.b205.gambyeol.stars.dto.StarRequestDto;
import com.b205.gambyeol.stars.service.StarService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StarController {

    private final StarService starService;

    @Value("${access.url.location}")
    private String location;

    @PostMapping("/stars")
    public ResponseEntity save(@RequestPart(value = "dto", required = false) StarRequestDto dto,
                               @AuthenticationPrincipal long userId,
                               @RequestPart(value = "imgFile", required = false) MultipartFile imgFile) {
        return ResponseEntity.ok(starService.save(dto, userId, imgFile));
    }

    @PostMapping("/clicks")
    public String saveClick(@RequestBody ClickRequestDto clickDto) {
        FileWriter file = null;
        JSONObject clickdata = new JSONObject();
        long user =  clickDto.getUser();
        try {
            clickdata.put("userId", user);
            clickdata.put("lat", clickDto.getLatitude());
            clickdata.put("long", clickDto.getLongitude());
            clickdata.put("mood", clickDto.getMood());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        System.out.println(clickdata);
        String uploadPath = "";
        if ("ec2".equals(location)) {
            uploadPath = System.getProperty("user.dir") + File.separator + "clicklog";
        }
        else {
            uploadPath = System.getProperty("user.home") + File.separator + "clicklog";
        }

        if(!new File(uploadPath).exists()){
            try{
                new File(uploadPath).mkdir();
            }
            catch(Exception e){
                e.getStackTrace();
            }
        }
        String time = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss").format(LocalDateTime.now());
        Random rnd = new Random();
        String randomStr = time + user + String.valueOf((char) ((int) (rnd.nextInt(26)) + 97)) + String.valueOf(rnd.nextInt());
        String saveFileName = randomStr;
        String savePath = uploadPath+File.separator+saveFileName;
        try {
            file = new FileWriter(savePath+".json");
            file.write(clickdata.toString());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                file.flush();
                file.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        return "clickjson파일저장";

    }

    @GetMapping("stars/all")
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
    public ResponseEntity likeSave(@RequestBody Boolean mark,
                                   @AuthenticationPrincipal long userId,
                                   @RequestBody final long id) {
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

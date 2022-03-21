package com.b205.gambyeol.stars.service;

import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.stars.domain.StarRepository;
import com.b205.gambyeol.stars.dto.StarRequestDto;
import com.b205.gambyeol.stars.dto.StarResponseDto;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.domain.UsersRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StarService {

    private final StarRepository starRepository;
    private final UsersRepository usersRepository;

    @Value("${access.url.location}")
    private String location;

    @Transactional
    public Long save(StarRequestDto params, long userId, MultipartFile imgFile) {
        // 작성자 등록
        Users finduser = usersRepository.findByUserId(userId);
        params.setUser(finduser);

        // 이미지 파일 등록
        String time = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss").format(LocalDateTime.now());
        Random rnd = new Random();
        String randomStr = time + userId + String.valueOf((char) ((int) (rnd.nextInt(26)) + 97)) + String.valueOf(rnd.nextInt());
        String originFileName=imgFile.getOriginalFilename();
        String saveFileName = randomStr + originFileName.toLowerCase();

        String uploadPath = "";
        if ("dev".equals(location)) {
            uploadPath = System.getProperty("user.home") + File.separator + "gambyeolImg";
        }
        else {
            uploadPath = System.getProperty("user.dir") + File.separator + "gambyeolImg";
        }

        if(!new File(uploadPath).exists()){
            try{
                new File(uploadPath).mkdir();
            }
            catch(Exception e){
                e.getStackTrace();
            }
        }

        String savePath = uploadPath+File.separator+saveFileName;
        if(!new File(savePath).exists()) {
            try {
                imgFile.transferTo(new File(savePath));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        params.setImageUrl("file:///" + savePath);
        Star entity = starRepository.save(params.toEntity());
        return entity.getStarId();
    }

    public List<StarResponseDto> findAll() {

        Sort sort = Sort.by(Sort.Direction.DESC, "starId", "date");
        List<Star> list = starRepository.findAll(sort);
        return list.stream().map(StarResponseDto::new).collect(Collectors.toList());
    }
}

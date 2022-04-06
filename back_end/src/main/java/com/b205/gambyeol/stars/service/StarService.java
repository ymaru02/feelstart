package com.b205.gambyeol.stars.service;

import com.b205.gambyeol.stars.domain.Likes;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.stars.domain.StarLikesRepository;
import com.b205.gambyeol.stars.domain.StarRepository;
import com.b205.gambyeol.stars.dto.StarLikesRequestDto;
import com.b205.gambyeol.stars.dto.StarRequestDto;
import com.b205.gambyeol.stars.dto.StarResponseDto;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.domain.UsersRepository;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
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
    private final StarLikesRepository likesRepository;
    private final UsersRepository usersRepository;

    @Value("${access.url.location}")
    private String location;

    @Transactional
    public Long save(@NotNull StarRequestDto params, long userId, MultipartFile imgFile) {
        // 작성자 등록
        Users finduser = usersRepository.findByUserId(userId);
        params.setUser(finduser);

        // 이미지 파일 등록
        String time = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss").format(LocalDateTime.now());
        Random rnd = new Random();
        String randomStr = time + userId + String.valueOf((char) ((int) (rnd.nextInt(26)) + 97)) + String.valueOf(rnd.nextInt());
        String originFileName=imgFile.getOriginalFilename();
        int index = originFileName.lastIndexOf(".");
        String extention =  originFileName.substring(index);
        String saveFileName = randomStr+extention;

        String uploadPath = "";
        if ("ec2".equals(location)) {
            uploadPath = System.getProperty("user.dir") + File.separator + "gambyeolImg";
        }
        else {
            uploadPath = System.getProperty("user.home") + File.separator + "gambyeolImg";
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

        params.setImageName(saveFileName);
        Star entity = starRepository.save(params.toEntity());
        return entity.getStarId();
    }

    public List<StarResponseDto> findAll() {

        Sort sort = Sort.by(Sort.Direction.DESC, "starId", "date");
        List<Star> list = starRepository.findAll(sort);
        return list.stream().map(StarResponseDto::new).collect(Collectors.toList());
    }

    @Transactional
    public List<StarResponseDto> findAllByUserUserId(final Long userId) {
        Users finduser = usersRepository.findByUserId(userId);
        Sort sort = Sort.by(Sort.Direction.DESC, "date");
        List<Star> list = starRepository.findAllByUserUserId(finduser.getUserId(), sort);
        return list.stream().map(StarResponseDto::new).collect(Collectors.toList());
    }

    @Transactional
    public StarResponseDto findById(final Long id) {
        Star entity = starRepository.findByStarId(id);
        return new StarResponseDto(entity);
    }

    // 입력된 유저 id, 게시글 id를 가진 좋아요 객체를 찾아내는 메소드
    public Likes findLikesByStarStarIdAndUserUserId(@NotNull StarLikesRequestDto params, final Long starId, final Long userId) {
        Likes likes = likesRepository.findLikesByStarStarIdAndUserUserId(starId, userId);

        // 좋아요 or 좋아요 취소한 기록이 없는 경우 등록하고 likes 객체를 가져온다.
        if(likes == null) {
            likes = saveLikes(params, starId, userId);
        }else {
            likes.setMark(params.getMark());
        }

        return likes;
    }

    // 좋아요 등록하는 메소드
    @Transactional
    public Likes saveLikes(@NotNull StarLikesRequestDto params, long userId, long starId) {
        // 게시된 글 정보 등록
        Star findstar = starRepository.findByStarId(starId);
        params.setStar(findstar);

        // 좋아요 누른 사람 정보 등록
        Users finduser = usersRepository.findByUserId(userId);
        params.setUser(finduser);

        Likes entity = likesRepository.save(params.toEntity());
        return entity;
    }
}

package com.b205.gambyeol.log.service;

import com.b205.gambyeol.log.domain.LoginUserInfoRepository;
import com.b205.gambyeol.log.domain.LoginUserInformation;
import com.b205.gambyeol.log.dto.LoginUserInfoResponseDto;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.stars.domain.StarRepository;
import com.b205.gambyeol.stars.dto.StarResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class LogService {

    private final LoginUserInfoRepository loginLogRepository;

    public List<LoginUserInfoResponseDto> findAll() {

        Sort sort = Sort.by(Sort.Direction.DESC, "loginUserDatetime");
        List<LoginUserInformation> list = loginLogRepository.findAll(sort);
        return list.stream().map(LoginUserInfoResponseDto::new).collect(Collectors.toList());
    }


}

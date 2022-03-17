package com.b205.gambyeol.stars.service;

import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.stars.domain.StarRepository;
import com.b205.gambyeol.stars.dto.StarRequestDto;
import com.b205.gambyeol.stars.dto.StarResponseDto;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.domain.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StarService {

    private final StarRepository starRepository;
    private final UsersRepository usersRepository;

    @Transactional
    public Long save(final StarRequestDto params) {

        Star entity = starRepository.save(params.toEntity());
        return entity.getStarId();
    }

        public List<StarResponseDto> findAll() {

        Sort sort = Sort.by(Sort.Direction.DESC, "starId", "date");
        List<Star> list = starRepository.findAll(sort);
        return list.stream().map(StarResponseDto::new).collect(Collectors.toList());
    }
}

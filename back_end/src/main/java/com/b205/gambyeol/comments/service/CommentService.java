package com.b205.gambyeol.comments.service;

import com.b205.gambyeol.comments.domain.Comment;
import com.b205.gambyeol.comments.domain.CommentRepository;
import com.b205.gambyeol.comments.dto.CommentResponseDto;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.stars.domain.StarRepository;
import com.b205.gambyeol.stars.dto.StarResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final StarRepository starRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public List<CommentResponseDto> findAllByStarId(final Long starId) {
        Star findstar = starRepository.findByStarId(starId);
        Sort sort = Sort.by(Sort.Direction.DESC, "date");
        List<Comment> list = commentRepository.findAllByStarStarId(findstar.getStarId(), sort);
        return list.stream().map(CommentResponseDto::new).collect(Collectors.toList());
    }

}

package com.b205.gambyeol.comments.service;

import com.b205.gambyeol.comments.domain.Comment;
import com.b205.gambyeol.comments.domain.CommentRepository;
import com.b205.gambyeol.comments.dto.CommentRequestDto;
import com.b205.gambyeol.comments.dto.CommentResponseDto;
import com.b205.gambyeol.stars.domain.Likes;
import com.b205.gambyeol.stars.domain.Star;
import com.b205.gambyeol.stars.domain.StarRepository;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.domain.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    @Autowired
    private final StarRepository starRepository;
    @Autowired
    private final CommentRepository commentRepository;
    @Autowired
    private final UsersRepository usersRepository;

    @Transactional
    public List<CommentResponseDto> findAllByStarId(final Long starId) {
        Star findstar = starRepository.findByStarId(starId);
        Sort sort = Sort.by(Sort.Direction.DESC, "date");
        List<Comment> list = commentRepository.findAllByStarStarId(findstar.getStarId(), sort);
        return list.stream().map(CommentResponseDto::new).collect(Collectors.toList());
    }

    @Transactional
    public Long save(final long userId, final String content, final long starId) {
        // 작성자 등록
        Users finduser = usersRepository.findByUserId(userId);

        Star findstar = starRepository.findByStarId(starId);
        Comment comment = Comment.builder()
                .user(finduser)
                .star(findstar)
                .date(LocalDateTime.now())
                .content(content)
                .build();

        Comment entity = commentRepository.save(comment);
        return entity.getCommentId();
    }

    @Transactional
    public Boolean delete(final long userId, final long commentId) {
        Comment entity = commentRepository.findByCommentId(commentId);
        if (entity.getUser().getUserId().equals(userId)){
            commentRepository.delete(entity);
            return true;
        }
        return false;
    }
}

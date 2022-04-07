package com.b205.gambyeol.users.service;

import com.b205.gambyeol.users.domain.Follow;
import com.b205.gambyeol.users.domain.FollowRepository;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.domain.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final UsersRepository usersRepository;
    private final FollowRepository followRepository;

    @Transactional
    public Long save(final Long toUserId, final Long fromUserId) {
        Users fromUser = usersRepository.findByUserId(fromUserId);
        Users toUser = usersRepository.findByUserId(toUserId);

        Follow entity = followRepository.findByFromUserAndToUser(fromUser, toUser);

        if(entity == null) {
            Follow follow = followRepository.save(Follow.builder()
                    .toUser(toUser)
                    .fromUser(fromUser)
                    .build());
            return follow.getFollowId();
        }else {
            return entity.getFollowId();
        }
    }

    @Transactional
    public Boolean findFollowByUser(final long toUserId, final long fromUserId) {
        Users fromUser = usersRepository.findByUserId(fromUserId);
        Users toUser = usersRepository.findByUserId(toUserId);

        Follow entity = followRepository.findByFromUserAndToUser(fromUser, toUser);

        if(entity != null) {
            System.out.println("delete");
            followRepository.deleteById(entity.getFollowId());
            return true;
        }else {
            System.out.println("no delete");
            return false;
        }
    }
}

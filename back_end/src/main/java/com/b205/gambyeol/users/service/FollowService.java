package com.b205.gambyeol.users.service;

import com.b205.gambyeol.users.domain.Follow;
import com.b205.gambyeol.users.domain.FollowRepository;
import com.b205.gambyeol.users.domain.Users;
import com.b205.gambyeol.users.domain.UsersRepository;
import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final UsersRepository usersRepository;
    private final FollowRepository followRepository;

    @Transactional
    public Boolean save(Long toUserId, Long fromUserId) {
        Users fromUser = usersRepository.findByUserId(fromUserId);
        Users toUser = usersRepository.findByUserId(toUserId);
        if (fromUser == null || toUser == null) {
            return false;
        }

        Follow entity = followRepository.findByFromUserAndToUser(fromUser, toUser);

        if(entity != null) {
            followRepository.delete(entity);
        }else {
            Follow follow = Follow.builder()
                    .fromUser(fromUser)
                    .toUser(toUser)
                    .build();

            followRepository.save(follow);
        }
        return true;
    }

}

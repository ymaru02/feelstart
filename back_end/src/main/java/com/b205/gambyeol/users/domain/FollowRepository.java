package com.b205.gambyeol.users.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByFromUserAndToUser(Users fromUserId, Users toUserId);

    List<Follow> findByFromUser(Users fromUser);
    List<Follow> findByToUser(Users toUser);

}

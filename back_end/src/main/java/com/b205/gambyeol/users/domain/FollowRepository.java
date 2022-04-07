package com.b205.gambyeol.users.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByFromUserAndToUser(Users fromUserId, Users toUserId);

}

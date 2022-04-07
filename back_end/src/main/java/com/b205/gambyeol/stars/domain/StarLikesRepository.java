package com.b205.gambyeol.stars.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StarLikesRepository extends JpaRepository<Likes, Long> {
    Likes findByStarStarIdAndUserUserId(Long starId, Long userId);

    Long countByStarStarId(long id);
}

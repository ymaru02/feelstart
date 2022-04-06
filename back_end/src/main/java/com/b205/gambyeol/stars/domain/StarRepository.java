package com.b205.gambyeol.stars.domain;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface StarRepository extends JpaRepository<Star, Long> {
    Star findByStarId(long starId);
    List<Star> findAllByUserUserId(long userId, Sort sort);
}

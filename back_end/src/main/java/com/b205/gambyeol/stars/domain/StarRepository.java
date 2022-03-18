package com.b205.gambyeol.stars.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StarRepository extends JpaRepository<Star, Long> {
}

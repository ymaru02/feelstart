package com.b205.gambyeol.log.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginUserInfoRepository extends JpaRepository<LoginUserInformation, Long> {

}

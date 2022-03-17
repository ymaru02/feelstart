package com.b205.gambyeol.users.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
    
    Users findKakaoUserEntityByKakaoId(Long kakaoId); // kakaoId에 해당하는 카카오 id를 가진 유저를 검색

}

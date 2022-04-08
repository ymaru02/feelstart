package com.b205.gambyeol.users.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByUserId(Long userId);
    Users findKakaoUserEntityByKakaoId(Long kakaoId); // kakaoId에 해당하는 카카오 id를 가진 유저를 검색

    @Query(value = "SELECT a.user_id, a.nickname, a.kakao_id, a.profile from users as a\n" +
            "WHERE a.user_id \n" +
            "IN (SELECT b.to_user_id as friends FROM follow as b\n" +
            "WHERE b.to_user_id \n" +
            "\tIN (SELECT c.from_user_id FROM follow c\n" +
            "WHERE c.to_user_id = :id) AND b.from_user_id = :id)", nativeQuery = true)
    public List<Users> friendslist(@Param(value = "id") long userId);
}

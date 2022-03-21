package com.b205.gambyeol.users.security;

import com.b205.gambyeol.users.domain.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {

    private static final String SECRET_KEY="NMA8jPctFuna59f5";

    public String create(Users user){
        Date expiryDate=Date.from(Instant.now().plus(1, ChronoUnit.DAYS)); // 기한은 생성 시점에서 1일

        return Jwts.builder()
                // header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                // payload에 들어갈 내용
                .setSubject(user.getUserId().toString()) // 사용자 아이디를 subject로 등록
                .setIssuer("gambyeol")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }

    // 토큰 디코딩&파싱
    public Long validateAndGetUserId(String token){

        log.info("token: "+token);

        Claims claims=Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject()); // subject로 등록된 것->사용자 아이디를 리턴한다.
    }
}

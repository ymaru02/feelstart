package com.b205.gambyeol.config;

import com.b205.gambyeol.users.security.JwtAuthenticationFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

@Slf4j
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // HttpSecurity: 시큐리티 설정을 위한 오브젝트

        http.cors() //WebMvcConfig에서 이미 한번 설정했으므로 기본 cors 설정
                .and()
                .csrf() // csrf는 현재 사용하지 않으므로 disable
                .disable()
                .httpBasic() // token을 사용하므로 basic 인증 siable
                .disable()
                .sessionManagement() // session 기반이 아님
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests() // /account/** 경로는 인증 안 해도 됨
                .antMatchers("/","/account/**").permitAll()
                .anyRequest()
                .authenticated();

        // filter 등록
        // 매 요청마다 CorsFilter를 실행한 다음 jwtAuthenticationFilter를 실행한다
        http.addFilterAfter(
                jwtAuthenticationFilter,
                CorsFilter.class
        );

    }
}

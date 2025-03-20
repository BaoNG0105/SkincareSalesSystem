package com.SWP391.SkinCareSystem.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    // nhung trang bat nuoc dang nhap ms dc vao : vd trang admin
    // nhung tragn yeu cau dung role ms dc vào , staff ko dc truy cap tragn admin , admin ko dc vào hom đặt hàng...
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF

                .authorizeHttpRequests(
                        //auth -> auth
                        // .requestMatchers("/users/**","/hello","/api/auth/register", "/api/auth/login").permitAll() // Allow Register & Login
                        //.anyRequest().authenticated() // Các request khác cần login

                        auth -> auth.anyRequest().permitAll()
                )

                .formLogin(form -> form.disable()) // Không dùng form login mặc định của Spring
                .httpBasic(httpBasic -> httpBasic.disable()); // Disable HTTP Basic Auth nếu không dùng

        return http.build();
    }

}

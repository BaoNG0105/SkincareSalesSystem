package com.example.demo.configuration;


import com.example.demo.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable) // Tắt giao diện form login
                // Request đi qua bộ lọc này trước
                .cors()
                .and()

                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) // xác thực
                .authorizeHttpRequests(requests -> { // phân quyền
                    requests
                            .requestMatchers(
                                    "/api-docs",
                                    "/api-docs/**",
                                    "/swagger-resources",
                                    "/swagger-resources/**",
                                    "/configuration/ui",
                                    "/configuration/security",
                                    "/swagger-ui/**",
                                    "/swagger-ui.html",
                                    "/webjars/swagger-ui/**",
                                    "/swagger-ui/index.html",
                                    "/v3/api-docs/**"
                            ).permitAll()

                            .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/auth/login-with-google").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/auth/login-with-google/callback").permitAll()
                            .anyRequest().authenticated(); // Các api khác chỉ cần đăng nhập là call được
                });
        return http.build();
    }

    // 403 => vào đây kiểm tra
}

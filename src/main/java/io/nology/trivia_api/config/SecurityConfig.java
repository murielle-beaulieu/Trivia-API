package io.nology.trivia_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf(CsrfConfigurer::disable)
		// THIS IS WHERE WE ALLOW PUBLIC ENDPOINT VS SECURED ENDPOINT"
		.authorizeHttpRequests(
				(requests) -> requests
				.requestMatchers("/auth/register")
				.permitAll()
				.requestMatchers("/auth/login")
				.permitAll()
				.requestMatchers("/quizzes", "/leaderboard", "/quiz-questions", "/quizzes/won","/quizzes/{id}", "/users", "/users/{id}", "/users/{id}/quizzes", "/users/beepbeep/{id}")
				.permitAll()
				.anyRequest()
				.authenticated()
				)
			 .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
			 .sessionManagement(session -> session
		                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		     );

		return http.build();
	}

}

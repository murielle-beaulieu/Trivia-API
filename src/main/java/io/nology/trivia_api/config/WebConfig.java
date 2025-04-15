package io.nology.trivia_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS to all endpoints
                .allowedOrigins("http://localhost:5173/", "http://127.0.0.1:5173/" ) // Allow specific origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specific HTTP methods
                .allowedHeaders("*") // Allow specific headers
                .allowCredentials(true); // Allow credentials (e.g., cookies)
    }
//     @Configuration
// public class WebConfig implements WebMvcConfigurer {
//     @SuppressWarnings("null")
//     public void addCorsMappings(CorsRegistry registry) {
//         String[] allowedOrigins = { "http://localhost:5173/", "http://127.0.0.1:5173/" };
//         registry.addMapping("/**").allowedOrigins(allowedOrigins).allowedMethods("*").allowedHeaders("*");
//     }
// }


// removed due to an error
// .allowedHeaders("Content-Type", "Authorization") // Allow specific headers


}
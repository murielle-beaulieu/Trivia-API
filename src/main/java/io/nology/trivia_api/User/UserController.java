package io.nology.trivia_api.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.trivia_api.Quiz.Quiz;
import io.nology.trivia_api.QuizQuestion.QuizQuestion;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/users")
public class UserController {

    UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping()
    public List<User> getAllUsers() {
        return this.service.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User result = this.service.getById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{id}/quizzes")
    public ResponseEntity<List<Quiz>> getUserQuizzes(@PathVariable Long id) {
        List<Quiz> userQuizzes = this.service.getUserQuizzes(id);
        return new ResponseEntity<>(userQuizzes, HttpStatus.OK);
    }
    
    
}

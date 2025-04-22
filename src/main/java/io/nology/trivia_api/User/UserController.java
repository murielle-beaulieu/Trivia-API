package io.nology.trivia_api.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.trivia_api.Quiz.Quiz;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
    // principal.getName() will contain the email from JWT subject
    String email = principal.getName();
    User user = this.service.getByEmail(email);
    if (user == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(user, HttpStatus.OK);
}

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User result = this.service.getUserById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/{id}/quizzes")
    public ResponseEntity<List<Quiz>> getUserQuizzes(@PathVariable Long id) {
        List<Quiz> userQuizzes = this.service.getUserQuizzes(id);
        return new ResponseEntity<>(userQuizzes, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO data) {
        User toUpdate = this.service.updateUser(id, data);
        return new ResponseEntity<>(toUpdate, HttpStatus.OK);
    }
    
    @GetMapping("/beepbeep/{id}")
    public String beepbepp(@PathVariable Long id) {
        this.service.calculateScore(id);
        return "hey";
    }
    
}

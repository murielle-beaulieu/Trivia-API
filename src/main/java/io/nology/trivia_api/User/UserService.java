package io.nology.trivia_api.User;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import io.nology.trivia_api.Quiz.Quiz;

@Service
public class UserService {

  private UserRepository repo;

  public UserService(UserRepository repo) {
    this.repo = repo;
  }

  public User getById(Long userId) {
    Optional<User> result = this.repo.findById(userId);
    if (result.isEmpty()) {
      return null;
    }
    User found = result.get();
    return found;
  }

  public User getByEmail(String email) {
    Optional<User> result = this.repo.findByEmail(email);
    if (result.isEmpty()) {
      return null;
    }
    User found = result.get();
    return found;
  }

  public List<User> getAllUsers() {
    return this.repo.findAll();
  }

  public List<Quiz> getUserQuizzes(Long id) {
    Optional<User> result = this.repo.findById(id);
    if (result.isEmpty()) {
      return null;
    }
    User found = result.get();

    List<Quiz> userQuizzes = found.getQuizzes();
    return userQuizzes;
  }

  public User updateUser(Long id, UpdateUserDTO data) {
    Optional<User> result = this.repo.findById(id);
    if (result.isEmpty()) {
      return null;
    }
    User found = result.get();

    found.setFirstName(data.getFirstName());
    found.setLastName(data.getLastName());
    found.setGamerTag(data.getGamerTag());

    return this.repo.save(found);
  }

}
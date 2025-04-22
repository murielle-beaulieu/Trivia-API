package io.nology.trivia_api.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import io.nology.trivia_api.Quiz.Quiz;

@Service
public class UserService {

  private UserRepository repo;

  public UserService(UserRepository repo) {
    this.repo = repo;
  }

  public User getUserById(Long userId) {
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

  public void calculateScore(Long id) {
    User thisUser = getUserById(id);
    System.out.println(thisUser.getEmail());
    List<Quiz> userQuizzes = getUserQuizzes(id);
  
    int total = 0;

    for(Quiz q : userQuizzes) {
      total += q.getScore();
      System.out.println("total is :" + total);
    }

    thisUser.setPoints((long)total);

    repo.save(thisUser);
    System.out.println("User id: " + id + " now should have a total score of " + total);
  }

}
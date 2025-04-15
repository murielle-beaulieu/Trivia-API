package io.nology.trivia_api.User;

import java.util.List;
import java.util.Optional;
// import java.util.stream.Collector;
// import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import io.nology.trivia_api.Quiz.Quiz;
import io.nology.trivia_api.Quiz.QuizRepository;

@Service
public class UserService {

  private UserRepository repo;

  private QuizRepository quizRepo;

  public UserService(UserRepository repo, QuizRepository quizRepo) {
    this.repo = repo;
    this.quizRepo = quizRepo;
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

  // public List<User> rankUsers(Long id) {
  //   List<User> allUsers = getAllUsers();
  //   List<Quiz> allQuizzes = getUserQuizzes(id);

  //   // we need to keep track of all the points

  //   List<Quiz> won = allUsers.stream().flatMap((user) -> user.getQuizzes().stream()).filter((quiz) -> quiz.getHas_won() != false).collect(Collectors.toList());

  //   List<Quiz> lost = allQuizzes.stream().filter((quiz) -> quiz.getHas_won() == false).collect(Collectors.toList());

  //   // for every won quiz, we automatically give out 100 points

  //   // for every correctly answered question, we give 10 points
  //   // based on this, we sort user by the amounts of points they have
  

  //   // TODO Auto-generated method stub
  //   throw new UnsupportedOperationException("Unimplemented method 'rankUsers'");
  // }

}
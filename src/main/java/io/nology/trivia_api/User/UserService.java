package io.nology.trivia_api.User;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository repo;

    public User getById(Long userId) {
       Optional<User> result = this.repo.findById(userId);
       if (result.isEmpty()) {
        return null;
      }
      User found = result.get();
      return found;
    }
    
}

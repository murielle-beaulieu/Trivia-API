package io.nology.trivia_api.QuizResult;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nology.trivia_api.User.User;
import io.nology.trivia_api.User.UserRepository;

@Service
class QuizResultService {

    private QuizResultRepository repo;
    private UserRepository userRepo;
    private ModelMapper mapper;

    public QuizResultService(QuizResultRepository repo, ModelMapper mapper, UserRepository userRepo){
        this.repo = repo;
        this.mapper = mapper;
        this.userRepo = userRepo;
    }

    public List<QuizResult> getAllQuizResults() {
        return this.repo.findAll();
    }

    public QuizResult getQuizResultById(Long id) {
        Optional<QuizResult> found= this.repo.findById(id);
        if (found.isEmpty()) {
            return null;
        }
        QuizResult result = found.get();
        return result;
    }

    public String createQuizResult(QuizResultDTO data) throws Exception {
        // QuizResult newQuizResult = new QuizResult();
        // User user = userRepo.findById(data.getUserId()).orElseThrow(() -> new Exception("No User")); 
        System.out.println(userRepo.findById(data.getUserId())); /// CONFLICT: WE GET EMAIL FROM THIS METHOD
        return "hi";
        // newQuizResult.setUser(user);

        // newQuizResult.setDifficulty(data.getDifficulty());

        // newQuizResult.setScore(data.getScore());

        // return this.repo.save(newQuizResult);
        // also we need to create the list of QuizQuestions?
        // QuizResult newQuizRes = mapper.map(data, QuizResult.class);
        // return this.repo.save(newQuizRes);
    }

    // we'll need a function to calculate the score, which should come on how many q's we answered out of ten


}

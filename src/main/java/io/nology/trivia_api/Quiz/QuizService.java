package io.nology.trivia_api.Quiz;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import io.nology.trivia_api.QuizQuestion.QuizQuestion;
import io.nology.trivia_api.QuizQuestion.QuizQuestionRepository;
import io.nology.trivia_api.User.User;
import io.nology.trivia_api.User.UserRepository;

@Service
class QuizService {

    private QuizRepository repo;
    private UserRepository userRepo;
    private QuizQuestionRepository questionRepo;

    public QuizService(QuizRepository repo, UserRepository userRepo,
            QuizQuestionRepository questionRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.questionRepo = questionRepo;
    }
    
    public List<Quiz> getAllQuizzes() {
        return this.repo.findAll();
    }
    
    public Quiz getQuizById(Long id) {
        Optional<Quiz> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return null;
        }
        Quiz result = found.get();
        return result;
    }

    public List<Quiz> getAllQuizzesWon() {
        List<Quiz> all = this.repo.findAll();
        List<Quiz> allWon = all.stream().filter((quiz) -> quiz.getHas_won() != false).collect(Collectors.toList());
        return allWon;
    }

    public List<Quiz> getAllQuizzesLost() {
        List<Quiz> all = this.repo.findAll();
        List<Quiz> allLost = all.stream().filter((quiz) -> quiz.getHas_won() != true).collect(Collectors.toList());
        return allLost;
    }

    public Quiz createQuiz(QuizDTO data) throws Exception {

        Quiz newQuiz = new Quiz();
        User user = userRepo.findById(data.getUserId()).orElseThrow(() -> new Exception("No User"));
        newQuiz.setUser(user);

        newQuiz.setDifficulty(data.getDifficulty());
        newQuiz.setHas_won(data.getHas_won());
        newQuiz.setScore(calculateScore(data));

        // initializing a list for the questions
        List<QuizQuestion> list = new ArrayList<>();
        newQuiz.setQuiz_questions(list);

        // saving the quiz first, that way we have an Id for the question
        Quiz saved = this.repo.save(newQuiz);
        
        for (QuizQuestion questions : data.getQuestions()) {
            
            QuizQuestion newQuestion = new QuizQuestion();
            
            Quiz this_quiz = repo.findById(saved.getId()).orElseThrow(() -> new Exception("Not a valid quiz"));
            
            newQuestion.setQuizzes(this_quiz);
            newQuestion.setTitle(questions.getTitle());
            newQuestion.setGiven_answer(questions.getGiven_answer());
            newQuestion.setIs_correct(questions.getIs_correct());
            
            // then adding that to the array, it's mostly for display
            list.add(newQuestion);
            questionRepo.save(newQuestion);
        }  
        return saved;
    }
    
    private Long calculateScore(QuizDTO data){      
          
        Long score = (long) 0;

        if(data.getHas_won()) {
            score = (long) 10;
            return score;
        }

        Long numOfQuestions = (long) data.getQuestions().size();

        if (numOfQuestions <= 1) {
            return score;
        } else {
            score = (long) (numOfQuestions - 1);
            return score;
        }

    }

}

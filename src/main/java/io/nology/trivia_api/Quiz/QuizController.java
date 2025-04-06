package io.nology.trivia_api.Quiz;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    private final QuizService quizService;

    QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping()
    public ResponseEntity<List<Quiz>> getAllQuizzes () {
        List<Quiz> allQuizzes = this.quizService.getAllQuizzes();
        return new ResponseEntity<>(allQuizzes, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id){
        Quiz result = this.quizService.getQuizById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/won")
    public ResponseEntity<List<Quiz>> getQuizzesWon() {
        List<Quiz> allQuizzesWon = this.quizService.getAllQuizzesWon();
        return new ResponseEntity<>(allQuizzesWon, HttpStatus.OK);
    }

    @GetMapping("/lost")
    public ResponseEntity<List<Quiz>> getQuizzesLost() {
        List<Quiz> allQuizzesLost = this.quizService.getAllQuizzesLost();
        return new ResponseEntity<>(allQuizzesLost, HttpStatus.OK);
    }
    
    @PostMapping()
    public ResponseEntity<Quiz> createQuiz(@RequestBody @Valid QuizDTO data) throws Exception {
        Quiz newQuiz = this.quizService.createQuiz(data);
        return new ResponseEntity<>(newQuiz, HttpStatus.CREATED);
    }
    
}


/* login example */

// {
//     "email": "mu@work.com",
//     "password": "chai"
// }


/* post request example */

// {
//     "userId": 1,
//     "score": 10,
//     "difficulty": "EASY",
//     "has_won": false,
//     "questions": [
//         {
//             "title": "What was William Frederick Cody better known as?",
//             "given_answer": "Buffalo Bill",
//             "is_correct": true
//         },
//         {
//             "title": "What is a Tetris piece called?",
//             "given_answer": "Tetratile",
//             "is_correct": false
//         }
//     ]
// }
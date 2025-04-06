package io.nology.trivia_api.QuizQuestion;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/quiz-questions")
public class QuizQuestionController {

    QuizQuestionService quizQuestionService;

    QuizQuestionController (QuizQuestionService quizQuestionService) {
        this.quizQuestionService = quizQuestionService;
    }

    @GetMapping
    public ResponseEntity<List<QuizQuestion>> getAllQuizQuestions() {
        List<QuizQuestion> allQuestions = this.quizQuestionService.getAllQuizQuestions();
        return new ResponseEntity<>(allQuestions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizQuestion> getQuizQuestionById (@PathVariable Long id) {
        QuizQuestion result = this.quizQuestionService.getQuizQuestionById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<QuizQuestion> createQuizQuestions(@RequestBody @Valid QuizQuestionDTO data) {
        QuizQuestion newQuizQuestion = this.quizQuestionService.createQuizQuestion(data);
        return new ResponseEntity<>(newQuizQuestion, HttpStatus.CREATED);
    }
    
}

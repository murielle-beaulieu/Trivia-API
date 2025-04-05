package io.nology.trivia_api.QuizResult;

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
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@RequestMapping("/quiz-results")
public class QuizResultController {

    private final QuizResultService quizResService;

    QuizResultController(QuizResultService quizResService) {
        this.quizResService = quizResService;
    }

    @GetMapping()
    public ResponseEntity<List<QuizResult>> getAllQuizResults () {
        List<QuizResult> allQuizResults = this.quizResService.getAllQuizResults();
        return new ResponseEntity<>(allQuizResults, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<QuizResult> getQuizResultById(@PathVariable Long id){
        QuizResult result = this.quizResService.getQuizResultById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // @PostMapping()
    // public ResponseEntity<QuizResult> createQuizResult(@RequestBody @Valid QuizResultDTO data) throws Exception {
    //     QuizResult newQuizResult = this.quizResService.createQuizResult(data);
    //     return new ResponseEntity<>(newQuizResult, HttpStatus.CREATED);
    // }

    @GetMapping("/test")
    public String getMethodName(@RequestBody @Valid QuizResultDTO data) throws Exception {
        return this.quizResService.createQuizResult(data);
    }
    
    
    
}


// LOGIN

// {
//     "email": "mu@work.com",
//     "password": "chai"
// }
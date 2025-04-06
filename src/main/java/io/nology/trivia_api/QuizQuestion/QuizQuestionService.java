package io.nology.trivia_api.QuizQuestion;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
class QuizQuestionService {

    QuizQuestionRepository repo;

    public QuizQuestionService(QuizQuestionRepository repo) {
        this.repo = repo;
    }

    public List<QuizQuestion> getAllQuizQuestions() {
        return this.repo.findAll();
    }

    QuizQuestion getQuizQuestionById(Long id) {
        Optional<QuizQuestion> found = this.repo.findById(id);
        if (found.isEmpty()){
            return null;
        }
        QuizQuestion result = found.get();
        return result;
    }

    public QuizQuestion createQuizQuestion(QuizQuestionDTO data) {
        QuizQuestion newQuestion = new QuizQuestion();

        newQuestion.setTitle(data.getTitle());
        newQuestion.setGiven_answer(data.getGiven_answer());
        newQuestion.setIs_correct(data.getIs_correct());
        this.repo.save(newQuestion);

        return newQuestion;
    }
}

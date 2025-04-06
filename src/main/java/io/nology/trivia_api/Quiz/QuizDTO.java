package io.nology.trivia_api.Quiz;

import java.util.List;

import io.nology.trivia_api.Quiz.Quiz.Difficulty;
import io.nology.trivia_api.QuizQuestion.QuizQuestion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
class QuizDTO {

    private Long userId;

    private Long score;

    private Boolean has_won;

    private Difficulty difficulty; 

    private List<QuizQuestion> questions;

}

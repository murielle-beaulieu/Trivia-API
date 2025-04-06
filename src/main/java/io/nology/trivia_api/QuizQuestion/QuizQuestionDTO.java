package io.nology.trivia_api.QuizQuestion;

import lombok.Data;

@Data
public class QuizQuestionDTO {

    private Long quiz_id;

    private String title;

    private String given_answer;

    private Boolean is_correct;

}

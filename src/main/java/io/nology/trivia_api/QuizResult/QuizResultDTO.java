package io.nology.trivia_api.QuizResult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
class QuizResultDTO {

    public enum Difficulty {
        EASY,
        MEDIUM,
        HARD
      }

    private Long userId;

    private Long score; // should be between 0 and 10

    private Difficulty difficulty; 

    

}


/* example request */

// {
//     "user": 1,
//     "score": 10,
//     "difficulty": "EASY"
// }
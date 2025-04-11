import { useGetQuizzesQuery } from "../../state/quiz/quizSlice";

export function QuizList() {

    // we want this information to be particular to the player 
    // if no one is logged in, it should not be available

      const { data: allQuizData } = useGetQuizzesQuery();
      console.log(allQuizData);
      
    return (
        <section>
            {allQuizData?.map((quiz) => <li>Quiz #:{quiz.id} on difficulty: {quiz.difficulty}</li> )}
        </section>
    )
}
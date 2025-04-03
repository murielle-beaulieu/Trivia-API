import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery, useGetQuestionsQuery } from "./triviaSlice";
import { AppDispatch, RootState } from "../store";
import styles from "./trivia.module.scss";
import { increment } from "../counter/counterSlice";
import { useState } from "react";

export const Trivia = () => {

  const [category, setCategory] = useState(15);
  const { data: questionsData, isError, isLoading, isSuccess } = useGetQuestionsQuery(category);

  const quiz = useSelector((state: RootState) => state.triviaCategories);
  console.log(quiz);

  const { data: categoriesData  } = useGetCategoriesQuery();
  console.log(categoriesData?.trivia_categories[0].name);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  const currentQuestion = questionsData?.results[count];
  const correct_answer = currentQuestion?.correct_answer || "";
  const incorrect_answers = currentQuestion?.incorrect_answers || [];
  const all_answers = [...incorrect_answers];


const randomIndex = Math.floor(4 * Math.random());
all_answers.splice(randomIndex, 0, correct_answer)

function checkAnswer(answer: string) {
    if (answer == correct_answer) {
        dispatch(increment());
    } else {
        console.log('wronggg')
    }
}

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <h1>Some questions!!</h1>
        <div className={styles.question_card}>
          <div>
            <h3>{currentQuestion?.question}</h3>
          </div>
          <div>
            {/* <button onClick={() => dispatch(increment())}>{currentQuestion?.correct_answer}</button> */}
            {all_answers.map((answer) => (
              <button onClick={() => checkAnswer(answer)}>{answer}</button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return null;
};

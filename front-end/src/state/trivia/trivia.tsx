import { useGetQuestionsQuery } from "./triviaSlice";

export const Trivia = () => {

  const { data, isError, isLoading, isSuccess } =
     useGetQuestionsQuery()

const currentQuestion = data?.results[4];

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div>
        <h1>Some questions!!</h1>
    
        <h3>{currentQuestion?.question}</h3>
        <ul>
                <li>{currentQuestion?.correct_answer}</li>
                {currentQuestion?.incorrect_answers.map((incorrect_answer) => (
                    <li>{incorrect_answer}</li>
                ))}
            </ul>
        {/* <select
          className={styles.select}
          value={numberOfQuotes}
          onChange={e => {
            setNumberOfQuotes(Number(e.target.value))
          }}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
        {/* {data.results.map((result) => (
          <section>
            <h1>Category: {result.category}</h1>
            <h2>Questions {result.question}</h2>
            <ul>
                <li>{result.correct_answer}</li>
                {result.incorrect_answers.map((incorrect_answer) => (
                    <li>{incorrect_answer}</li>
                ))}
            </ul>
          </section>
        ))} */}

      </div>
    )
  }

  return null
}

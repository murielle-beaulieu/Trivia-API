import './App.css'
import Counter from "./components/Counter";
import { Trivia } from './state/trivia/trivia';


function App() {

  return (
    <>
      <h2>First attempt at Redux</h2>
      <Trivia/>
      <Counter/>
    </>
  )
}

export default App

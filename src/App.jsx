import { useEffect, useReducer } from 'react';
import Header from './components/Header.jsx';
import Loader from './components/Loader.jsx';
import StartScreen from './components/StartScreen.jsx';
import Error from './components/Error.jsx';
import Question from './components/Question.jsx';
import Main from '../main.jsx';
import Nextbutton from './components/NextButton.jsx';
import FinishScreen from './FinishScreen.jsx';
import Progress from './Progress.jsx';
import Timer from './Timer.jsx';
import Footer from './Footer.jsx';

const SEC_PER_QUESTION = 20;
// Initial state for the reducer
const initialState = {
  questions: [],
  status: 'loading',
  index: 0, // Track the current question index
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

// Reducer function to manage state transitions
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataNotReceived':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload, // Move to the next question
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1, answer: null
      };
      case 'finish':
        return {
          ...state,
          status: 'finished',highscore: state.points > state.highscore ? state.points : state.highscore
        };
        case 'restart':
          return {
            ...initialState,questions: state.questions, status: 'ready',
        
          };  
          case 'tick':
            return {
             ...state,
              secondsRemaining: state.secondsRemaining - 1,
              status: state.secondsRemaining === 0 ? 'finished' : state.status
            };
          
    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  // Fetch questions from the server
  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log the fetched questions
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((err) => dispatch({ type: 'dataNotReceived' }));
  }, []);

  console.log(status);  // Debug status to ensure it's transitioning correctly

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            {/* Ensure values are correct */}
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
           <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
            <Nextbutton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
           </Footer>
          </>
        )}
        {status==='finished' && <FinishScreen points={points} maxPoints={maxPoints}  highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

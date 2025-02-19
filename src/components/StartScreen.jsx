import React from 'react'

export default function startScreen({numQuestions,dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz</h2>
        <h3>{numQuestions} questions to Test your React knowledge</h3>
        <button className='btn btn-ui' onClick={() => dispatch({type:'start'})}>Lets Start</button>
        </div>
  )
}

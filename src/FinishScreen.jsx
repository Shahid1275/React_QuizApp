import React from 'react'

function FinishScreen({points,maxPoints,highscore,dispatch}) {
    const percentage = (points/maxPoints)*100
  let emoji;
  if(percentage >= 90){
    emoji = '🥇'}
    if(percentage >= 80){
      emoji = '🥈'
    }
    if(percentage >= 70){
      emoji = '🥉'
    }
    if(percentage< 50){
        emoji = '🙁'
    }
  return (
  <>
   <p className='result'>{emoji}You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)</p>
   <p className='highscore'>(HighScore: {highscore} POints {localStorage.getItem('highscore')})</p>
   <button className='btn btn-ui' onClick={() => dispatch({ type: 'restart' })}>Restart Quiz</button>
  </>
  )
}

export default FinishScreen
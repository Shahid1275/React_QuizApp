import React from 'react';
import Options from './Options';

function Question({ question, dispatch, answer }) {
  console.log(question); // Log the individual question to the console

  return (
    <div>
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;

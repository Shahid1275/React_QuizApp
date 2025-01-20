import React from 'react';
export default function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;
  // Ensure that question.options is an array before calling map
  if (!question || !Array.isArray(question.options)) {
    return <div>No options available</div>; // Handle missing options gracefully
  }

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button className={`btn btn-option ${answer === index ? 'answer' : ''}${hasAnswered ? index === question.correctOption ? ' correct' : 'wrong': ''}`} key={index} disabled={hasAnswered} onClick={() => dispatch({ type: 'newAnswer', payload: index })}>
          {option}
        </button>
      ))}
    </div>
  );
}

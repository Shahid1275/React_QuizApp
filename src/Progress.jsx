import React from 'react';

function Progress({ index, numQuestions, points, maxPoints,answer }) {
  return (
    <header className="progress">
      {/* Use a native HTML progress element or a custom progress bar */}
      <progress max={numQuestions} value={index} />  {/* Native progress bar */}
      {/* If you want a custom progress bar, you can replace the line above with your own */}
      <p>Question <strong>{index + Number(answer !== null)}</strong> / {numQuestions}</p>
      <p><strong>{points}</strong> /{maxPoints} </p>
    </header>
  );
}

export default Progress;

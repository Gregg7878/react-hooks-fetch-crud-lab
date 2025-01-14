import React from "react";

function QuestionList() {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{<QuestionList questions={questions} onDelete={handleDeleteQuestion} />}</ul>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <button onClick={() => onQuestionSelect(question)}>{question.prompt}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
function QuestionList({ questions, onDelete }) {
  return (
    <>
      {questions.map(question => (
        <div key={question.id}>
          <Question question={question} />
          <button onClick={() => onDelete(question.id)}>Delete</button>
        </div>
           
      ))}
      </>
      };


export default QuestionList;

import React from "react";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function QuestionDetail({ question, onCorrectIndexChange }) {
    const [correctIndex, setCorrectIndex] = useState(question.correctIndex);
  
    useEffect(() => {
      setCorrectIndex(question.correctIndex);
    }, [question]);
  
    const handleCorrectIndexChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setCorrectIndex(value);
      onCorrectIndexChange(value);
    };
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button>Delete Question</button>
    </li>
    
  );
}

export default QuestionItem;

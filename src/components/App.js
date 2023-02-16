import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleCorrectIndexChange = (correctIndex) => {
    const updatedQuestion = { ...selectedQuestion, correctIndex };

    fetch(`http://localhost:4000/questions/${selectedQuestion.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        );
        setQuestions(updatedQuestions);
        setSelectedQuestion(updatedQuestion);
      });
  };
  function handleFormChange(event) {
    const { name, value, type } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  }

  function handleAnswerChange(index, event) {
    const newAnswers = [...formData.answers];
    newAnswers[index] = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      answers: newAnswers,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions((prevQuestions) => [...prevQuestions, data]);
        setFormData({
          prompt: '',
          answers: ['', '', '', ''],
          correctIndex: 0,
        });
      });
  }
  function handleDeleteSelectedQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          setQuestions(questions.filter(q => q.id !== id));
        } else {
          throw new Error('Failed to delete question');
        }
      })
      .catch(error => console.error(error));
  }
  
  // This function sends a DELETE request to the server to delete the question with the given `id
  

  return (
    <div>
       <QuestionList questions={questions} onQuestionSelect={handleQuestionSelect} />
      {selectedQuestion && (
        <QuestionDetail question={selectedQuestion} onCorrectIndexChange={handleCorrectIndexChange} />
      )};
    
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="prompt">Prompt:</label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleFormChange}
         />
        </div>
        <div>
          <label htmlFor="answer0">Answer 1:</label>
          <input
            type="text"
            id="answer0"
            name="answer0"
            value={formData.answers[0]}
            onChange={(event) => handleAnswerChange(0, event)}
          />
        </div>
        <div>
          <label htmlFor="answer1">Answer 2:</label>
          <input
            type="text"
            id="answer1"
            name="answer1"
            value={formData.answers[1]}
            onChange={(event) => handleAnswerChange(1, event)}
          />
        </div>
        <div>
          <label htmlFor="answer2">Answer 3:</label>
          <input
            type="text"
            id="answer2"
            name="answer2"
            value={formData.answers[2]}
            onChange={(event) => handleAnswerChange(2, event)}
          />
        </div>
        <div>
          <label htmlFor="answer3">Answer 4:</label>
          <input
            type="text"
            id="answer3"
            name="answer3"
            value={formData.answers[3]}
            onChange={(event) => handleAnswerChange(3, event)}
          />
        </div>
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
    </main>
    </div>
  )};
  

export default App;

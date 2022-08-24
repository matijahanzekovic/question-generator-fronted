import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { createBrowserHistory } from "history";
import Navbar from '../src/components/core/Navbar.jsx';
import Home from '../src/components/Home.jsx';
import CreateQuiz from '../src/components/CreateQuiz.jsx';
import SolveQuiz from '../src/components/SolveQuiz.jsx';
import QuizArchives from '../src/components/QuizArchives.jsx';
import QuestionsArchives from './components/QuestionsArchives.jsx';
import './App.css';

const App = () => {
  const history = createBrowserHistory();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" render={() => <Navigate to="/home" element={<Home/>}/>} /> */}
        <Route path="/" element={<Home/>} />
        <Route path="/create-quiz" element={<CreateQuiz/>} />
        <Route path="/solve-quiz" element={<SolveQuiz/>} />
        <Route path="/quiz-archives" element={<QuizArchives/>} />
        <Route path="/questions-archives" element={<QuestionsArchives/>} />
      </Routes>
    </Router>
  );
}

export default App;

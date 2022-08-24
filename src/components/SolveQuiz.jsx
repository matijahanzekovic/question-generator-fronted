import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import axios from 'axios';

const SolveQuiz = () => {
    const [quiz, setQuiz] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [solvedQuiz, setSolvedQuiz] = useState({});
    const location = useLocation();

    useEffect(() => {
        const id = location.state.id;
        axios.get(`http://localhost:8080/api/get-quiz/${id}`)
            .then(response => {
                setQuiz(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    const onRadioButtonChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setSelectedAnswers({...selectedAnswers, [key]: value});
    }

    const mapToRequest = (selectedAnswersObject) => {
        const selectedAnswersResult = [];
        Object.entries(selectedAnswersObject).forEach(([key, value]) => {
            selectedAnswersResult.push({ id: key, answer: value });
        });
        return { quizId: quiz.id, selectedAnswers: selectedAnswersResult}
    };

    const refreshPage = () => {
        window.location.reload(true);
    }

    const solveQuiz = (request) => {
        axios.post('/solve-quiz', request)
        .then(response => {
            console.log(response.data);
            refreshPage();
        }).catch(error => {
            console.log(error);
        });
    }

    const onFinish = (event) => {
        event.preventDefault();
        const solveQuizRequest = mapToRequest(selectedAnswers)
        solveQuiz(solveQuizRequest);
    }

    const isChecked = (item) => {
        const selectedAnswer = item.selectedAnswer;
        const correctAnswer = item.correctAnswer;
        return selectedAnswer !== undefined && selectedAnswer !== null && selectedAnswer === correctAnswer;
    }

    const isDisabled = (item) => {
        const isCorrect = item.isCorrect;
        return isCorrect !== undefined && isCorrect !== null;
    }

    const colorListItem = (item) => {
        const isCorrect = item.isCorrect;

        if (isCorrect === true) {
            return "success";
        } else if (isCorrect === false) {
            return "danger"
        } else {
            return "";
        }
    }

    return (
        <>
            <div className='container mt-4'>
                <ListGroup as="ol" numbered>
                {quiz && quiz.questions && quiz.questions.map((item, index) =>
                        <>
                        <ListGroup.Item as="li" key={index} className='mt-4' variant={colorListItem(item)}>{item.question}</ListGroup.Item>
                            {item.answers.map((ans, ind) =>
                            <>
                                <ListGroup as="ol" key={ind}>
                                    <ListGroup.Item as="li">
                                        <div class="form-check" onChange={e => onRadioButtonChange(e)}>
                                            <input class="form-check-input" 
                                                   type="radio" 
                                                   value={ans} 
                                                   name={item.id} 
                                                   id={item.id}
                                                   checked={isChecked(item)}
                                                   disabled={isDisabled(item)}
                                            />
                                            <label class="form-check-label" for={ans}>
                                                {ans}
                                            </label>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </>
                            )}
                        </>
                )}
                </ListGroup>
                <div className='text-center mt-4'>
                    <button type="button" class="btn btn-success" onClick={e => onFinish(e)}>Finish and send answers</button>
                </div>
            </div>
        </>
    )
}

export default SolveQuiz;
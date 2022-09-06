import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import axios from 'axios';

const SolveQuiz = () => {
    const [quiz, setQuiz] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const id = location.state.id;
        axios.get(`http://localhost:8080/api/get-quiz/${id}`)
            .then(response => {
                setQuiz(response.data);
                setQuizScore(response.data);
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
        axios.post('http://localhost:8080/api/solve-quiz', request)
        .then(response => {
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

    const setQuizScore = (data) => {
        let score = 0;
        data.questions.forEach((q, i) => {
            if (q.isCorrect === true) {
                score += 1;
            }
        })
        setScore(score);
    }

    return (
        <>
            <div className='container mt-4'>
                {
                    quiz !== undefined && quiz.name !== undefined && quiz.name !== null &&
                    <h4>Quiz title: {quiz.name}</h4>
                }
                                {
                    score !== undefined && score !== null && score !== 0 && quiz !== undefined && quiz.questions !== undefined &&
                        quiz.questions !== 0 &&
                    <h4><br></br>Score: {score}/{quiz.questions.length}</h4>
                }
                <ListGroup as="ol" numbered>
                {quiz && quiz.questions && quiz.questions.map((item, index) =>
                        <>
                        <ListGroup.Item as="li" key={index} className='mt-4' variant={colorListItem(item)}>{item.question}</ListGroup.Item>
                            {item.answers.map((ans, ind) =>
                            <>
                                <ListGroup as="ol" key={ind}>
                                    <ListGroup.Item as="li">
                                        <div className="form-check" onChange={e => onRadioButtonChange(e)}>
                                            <input className="form-check-input" 
                                                   type="radio" 
                                                   value={ans} 
                                                   name={item.id} 
                                                   id={item.id}
                                                   checked={item.selectedAnswer === ans}
                                                   disabled={isDisabled(item)}
                                            />
                                            <label className="form-check-label" for={ans}>
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
                    <button type="button" className="btn btn-success" onClick={e => onFinish(e)}>Finish and send answers</button>
                </div>
            </div>
        </>
    )
}

export default SolveQuiz;
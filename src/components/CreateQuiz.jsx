import React, { useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";


const CreateQuiz = () => {
    const [questionGeneratorResponse, setQuestionGeneratorResponse] = useState([]);
    const [quizTitle, setQuizTitle] = useState("");
    const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
    const [quiz, setQuiz] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setQuestionGeneratorResponse(location.state);
    }, []);

    const onChange = (event) => {
        setQuizTitle(event.target.value);
    }

    const onCheckboxChange = (event) => {
        const questionId = event.target.name;
        const questionIds = [...selectedQuestionIds, questionId];

        if (selectedQuestionIds.includes(questionId)) {
            questionIds = questionIds.filter(id => id !== questionId);
        }

        setSelectedQuestionIds(questionIds);
    }

    const mapToRequest = (quizTitle, questionIds) => {
        return { name: quizTitle, questionAnswerIds: questionIds };
    };

    const createQuiz = (request) => {
        axios.post('http://localhost:8080/api/create-quiz', request)
        .then(response => {
            setQuiz(response.data);
            navigate('/solve-quiz', { state: response.data })
        }).catch(error => {
            console.log(error);
        });
    }

    const onFinish = (event) => {
        event.preventDefault();
        const createQuizRequest = mapToRequest(quizTitle, selectedQuestionIds)
        createQuiz(createQuizRequest);
    }

    return (
        <>
            <div className='container mt-4'>
                <h5>Here are all generated questions. Please enter quiz name and select questions you want to be added into new quiz.</h5>
                <br></br>
                <form>
                    <div class="form-group row mt-4">
                        <label for="quizTitle" class="col-sm-1 col-form-label">Quiz title:</label>
                        <div class="col-sm-11">
                            <input type="text" class="form-control" id="quizTitle" placeholder="Quiz title" onChange={e => onChange(e)}/>
                        </div>
                    </div>
                    <ListGroup as="ol">
                    {questionGeneratorResponse.map((item, index) =>
                        <>
                            <ListGroup.Item as="li" key={index} className='mt-4'>
                                <div class="form-check" onChange={e => onCheckboxChange(e)}>
                                    <input class="form-check-input" type="checkbox" value={item.question} name={item.id} id={item.id}/>
                                    <label class="form-check-label" for={item.question}>
                                        <span><p>{item.id}.  {item.question}</p></span>
                                    </label>
                                </div>
                            </ListGroup.Item>
                            {item.answers.map((ans, ind) =>
                                <>
                                    <ListGroup as="ol" key={ind}>
                                        <ListGroup.Item as="li">
                                            {ans}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </>
                            )}
                        </>
                    )}
                    </ListGroup>
                    <div className='text-center mt-4'>
                        <button type="button" class="btn btn-success" onClick={e => onFinish(e)}>Create quiz</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateQuiz;
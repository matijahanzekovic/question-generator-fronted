import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, Spinner } from "react-bootstrap";
import axios from 'axios';

const Home = () => {
    const [text, setText] = useState("");
    const [questionGeneratorResponse, setQuestionGeneratorResponse] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle] = useState("Generating questions and answers");
    const [modalBody] = useState("Questions and answers are being generated. Depending on the size of the text, this process can take up to 5 minutes.");
    const navigate = useNavigate();

    const onChange = (event) => {
        setText(event.target.value);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const generateQuestionsAndAnswers = (text) => {
        setShowModal(true);

        axios.post('http://localhost:8080/api/generate', text)
        .then(response => {
            setQuestionGeneratorResponse(response.data);
            setShowModal(false);
            navigate('/create-quiz', { state: response.data })
        }).catch(error => {
            console.log(error);
            setShowModal(false);
        });
    }

    const onFinish = (event) => {
        event.preventDefault();
        generateQuestionsAndAnswers(text);
    }

    return (
        <>
            <Modal show={showModal} 
                   onHide={handleCloseModal}
                   backdrop="static"
                   keyboard={false}>
                <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalBody}
                    <br></br><br></br>
                    <div className='text-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    </div>
                </Modal.Body>
            </Modal>
            <div className='container'>
                    <h5 className='text-center mt-4 mb-4'>In text box below enter text for which you want to generate questions:</h5>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className="form-group row">
                                <div className="col-12">
                                    <textarea className="form-control" type="text" rows="30" onChange={e => onChange(e)}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="btn btn-success" onClick={e => onFinish(e)}>
                            Generate questions <i className="fa fa-floppy-o"></i>
                        </button>
                    </div>
            </div>
        </>
    )
}

export default Home;
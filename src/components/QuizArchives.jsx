import React, { useEffect, useState } from "react";
import ItemCard from './core/ItemCard.jsx';
import axios from 'axios';

const QuizArchives = () => {
    const [quizList, setQuizList] = useState([]);
    const [isListEmpty, setIsListEmpty] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-quiz-list')
        .then(response => {
            setQuizList(response.data);
            if (response.data.length > 0) {
                setIsListEmpty(false);
            }
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col-12'>
                    <div className='row'>
                        { quizList &&
                          quizList.map((quiz, index) => (
                            <ItemCard key={index} item={quiz} />
                          ))
                        }
                        { isListEmpty === true &&
                            <img className="card-img-top" src="/images/nodata.jpg" alt="NoData"/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizArchives;
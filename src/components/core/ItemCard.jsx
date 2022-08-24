import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ItemCard = (props) => {
    const [item, setItem] = useState(props.item);

    useEffect(() => {
        console.log(props);
        setItem(props.item);
    }, [props.item]);

    return (
        <div className="col-lg-3 col-md-3 mb-3">
            <div className="card h-100">
                <img className="card-img-top" src="/images/quiz.jpg" alt="Quiz"/>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <div className='text-center'>
                        <Link to='/solve-quiz' state={item} className="btn btn-primary btn-md active" role="button">
                            Details <i className="fa fa-shopping-cart"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;
import React, { useEffect, useState } from 'react';
import StarRating from '../components/StarRating';

import { endpoints, getHeaders } from "../redux/helpers/api"


// This javascript file contains code to view the list of customer reviews. 
// check the Reviews menu page for more information




export function Reviews() {

    const [reviews, setreviews] = useState([]);

    useEffect(() => {
        fetch(endpoints.API_HOME + '/reviews', {
            headers: getHeaders(true)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert("Oops. An Error Occured")
                }
            })
            .then(data => {
                setreviews(data.payload);
            })
    }, []);




    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> Top Reviews </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Assets Management</a></li>
                        {/* <li className="breadcrumb-item active" aria-current="page">Form elements</li> */}
                    </ol>
                </nav>
            </div>

            <div className="row">
                <div className="col-12 grid margin">
                    {/* <div className="card"> */}
                        {/* <div className="card-body"> */}
                            {reviews.map((review) => (
                                <div className="card mb-3 p-3">
                                    <div className="d-flex align-items-center mb-2">
                                        <StarRating value={review.rating} />
                                        <p className="text-success ml-2 mb-0 font-weight-medium">@user{review.ReviewerUserId}</p>
                                    </div>
                                    <p className="mb-0">{review.comment}</p>
                                </div>
                            ))}
                        {/* </div> */}
                    {/* </div> */}
                </div>
            </div>

            <br />
        </div >
    )
}



export default Reviews
import React from 'react';

function StarRating({ value }) {
    let stars = [];
    
    for (let i = 0; i < value; i++){
        stars.push(<span class="fa fa-star fa-lg mr-1 checked-star"></span>);
    }

    for (let i = value; i < 5; i++){
        stars.push(<span class="fa fa-star mr-1 fa-lg"></span>);
    }

    return (<div>{stars}</div>)
}

export default StarRating;
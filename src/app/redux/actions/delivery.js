import deliveryActionTypes from '../types/delivery';
import { endpoints, getHeaders } from '../helpers/api';
// import { signupStarted } from './auth';

export const fetchDeliveryStart = () => {
    return {
        type: deliveryActionTypes.FETCH_DELIVERY_START,
    }
}

export const fetchDeliverySucess = (payload) => {
    return {
        type: deliveryActionTypes.FETCH_DELIVERY_SUCCESS,
        payload,
    }
}

export const fetchDeliveryFailure = (payload) => {
    return {
        type: deliveryActionTypes.FETCH_DELIVERY_FAILURE,
        payload,
    }
}

export const fetchDeliveries = () => dispatch => {
    dispatch(fetchDeliveryStart());
    fetch(endpoints.API_HOME + '/deliveries/', {
        headers: getHeaders(true)
    })
        .then (res => {
            if (res.status === 200) {
                return res.json();
            } else {
                dispatch(fetchDeliveryFailure("Oops. An Error Occured"))
            }
        })
        .then (data => {
            dispatch(fetchDeliverySucess(data.payload));
        }).catch(err => {
            dispatch(fetchDeliveryFailure("Oops. An Error Occured"))
        })


}

import locationActionTypes from '../types/location';
import { endpoints, getHeaders } from '../helpers/api';
// import { signupStarted } from './auth';

export const fetchLocationStart = () => {
    return {
        type: locationActionTypes.FETCH_LOCATION_START,
    }
}

export const fetchLocationSucess = (payload) => {
    return {
        type: locationActionTypes.FETCH_LOCATION_SUCCESS,
        payload,
    }
}

export const fetchLocationFailure = (payload) => {
    return {
        type: locationActionTypes.FETCH_LOCATION_FAILURE,
        payload,
    }
}

export const fetchLocations = () => dispatch => {
    dispatch(fetchLocationStart());
    fetch(endpoints.API_HOME + '/locations/', {
        headers: getHeaders(true)
    })
        .then (res => {
            if (res.status === 200) {
                return res.json();
            } else {
                dispatch(fetchLocationFailure("Oops. An Error Occured"))
            }
        })
        .then (data => {
            dispatch(fetchLocationSucess(data.payload));
        }).catch(err => {
            dispatch(fetchLocationFailure("Oops. An Error Occured"))
        })


}

import locationActionTypes from '../types/location';

const initialState = {
    locations: [],
    fetchingLocation: false,
    fetchLocationError: null,
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case locationActionTypes.FETCH_LOCATION_START: {
            return {
                ...state,
                fetchingLocation: true,
                fetchLocationError: null,
            }
        }
        case locationActionTypes.FETCH_LOCATION_SUCCESS: {
            return {
                ...state,
                fetchingLocation: false,
                fetchLocationError: null,
                locations: action.payload,
            }
        }
        case locationActionTypes.FETCH_LOCATION_FAILURE: {
            return {
                ...state,
                fetchingLocation: false,
                fetchLocationError: action.payload,
            }
        }
        default: {
            return state;
        }

    }
}

export default locationReducer; 
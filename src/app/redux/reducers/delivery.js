import deliveryActionTypes from '../types/delivery';

const initialState = {
    delivery: [],
    fetchingDelivery: false,
    fetchDeliveryError: null,
};

const deliveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case deliveryActionTypes.FETCH_DELIVERY_START: {
            return {
                ...state,
                fetchingDelivery: true,
                fetchDeliveryError: null,
            }
        }
        case deliveryActionTypes.FETCH_DELIVERY_SUCCESS: {
            return {
                ...state,
                fetchingDelivery: false,
                fetchDeliveryError: null,
                delivery: action.payload,
            }
        }
        case deliveryActionTypes.FETCH_DELIVERY_FAILURE: {
            return {
                ...state,
                fetchingDelivery: false,
                fetchDeliveryError: action.payload,
            }
        }
        default: {
            return state;
        }

    }
}

export default deliveryReducer; 
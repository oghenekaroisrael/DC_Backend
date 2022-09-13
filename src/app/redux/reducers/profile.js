import profileActionTypes from '../types/profile';

const initialState = {
    fares: [],
    agents: [],
    companyDetails: {},
    managerDetails: {},
    ownerDetails: {},
    fetchingFares: false,
    fetchFaresError: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActionTypes.FETCH_FARES_START: {
            return {
                ...state,
                fetchingFares: true,
                fetchFaresError: null,
            }
        }
        case profileActionTypes.FETCH_FARES_SUCCESS: {
            return {
                ...state,
                fares: action.payload,
                fetchingFares: false,
                fetchFaresError: null,
            }
        }
        case profileActionTypes.FETCH_FARES_FAILURE: {
            return {
                ...state,
                fetchingFares: false,
                fetchFaresError: action.payload,
            }
        }

        case profileActionTypes.DELETE_FARE_START: {
            return {
                ...state,
                deletingFare: true,
                deleteFareError: null,
            }
        }
        case profileActionTypes.DELETE_FARE_SUCCESS: {
            const newRates = state.fares.filter(rate => rate.id !== action.payload)
            return {
                ...state,
                fares: newRates,
                deletingFare: false,
                deleteFareError: null,
            }
        }
        case profileActionTypes.DELETE_FARE_FAILURE: {
            return {
                ...state,
                deletingFare: false,
                deleteFareError: action.payload,
            }
        }

        case profileActionTypes.CREATE_FARE_START: {
            return {
                ...state,
                creatingFare: true,
                createFareError: null,
            }
        }
        case profileActionTypes.CREATE_FARE_SUCCESS: {
            const newRates = [...state.fares, action.payload]
            return {
                ...state,
                fares: newRates,
                creatingFare: false,
                createFareError: null,
            }
        }
        case profileActionTypes.CREATE_FARE_FAILURE: {
            return {
                ...state,
                creatingFare: false,
                createFareError: action.payload,
            }
        }

        case profileActionTypes.UPDATE_FARE_START: {
            return {
                ...state,
                updatingFare: true,
                updateFareError: null,
            }
        }
        case profileActionTypes.UPDATE_FARE_SUCCESS: {
            
            const index = state.fares.findIndex(el => el.id === action.payload.id); 
            const newRates = [...state.fares]; 
            
            newRates[index] = action.payload;
            
            return {
                ...state,
                fares: newRates,
                updatingFare: false,
                updateFareError: null,
            }
        }
        case profileActionTypes.UPDATE_FARE_FAILURE: {
            return {
                ...state,
                updatingFare: false,
                updateFareError: action.payload,
            }
        }

        case profileActionTypes.FETCH_PROFILE_START: {
            return {
                ...state,
                fetchingProfile: true,
                fetchProfileError: null,
            }
        }
        case profileActionTypes.FETCH_PROFILE_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                fetchingProfile: false,
                fetchProfileError: null,
            }
        }
        case profileActionTypes.FETCH_PROFILE_FAILURE: {
            return {
                ...state,
                fetchingProfile: false,
                fetchProfileError: action.payload,
            }
        }
        
        case profileActionTypes.UPDATE_COMPANY_DETAILS_START: {
            return {
                ...state,
                updatingCompanyDetails: true,
                updateCompanyDetailsError: null,
            }
        }
        case profileActionTypes.UPDATE_COMPANY_DETAILS_SUCCESS: {
            const newCompanyDetails = {
                ...state.companyDetails,
                ...action.payload
            };
            return {
                ...state,
                companyDetails: newCompanyDetails,
                updatingCompanyDetails: false,
                updateCompanyDetailsError: null,
            }
        }
        case profileActionTypes.UPDATE_COMPANY_DETAILS_FAILURE: {
            return {
                ...state,
                updatingCompanyDetails: false,
                updateCompanyDetailsError: action.payload,
            }
        }

        case profileActionTypes.UPDATE_MANAGER_DETAILS_START: {
            return {
                ...state,
                updatingManagerDetails: true,
                updateManagerDetailsError: null,
            }
        }
        case profileActionTypes.UPDATE_MANAGER_DETAILS_SUCCESS: {
            const newManagerDetails = { 
                ...state.managerDetails, 
                ...action.payload 
            };
            return {
                ...state,
                managerDetails: newManagerDetails,
                updatingManagerDetails: false,
                updateManagerDetailsError: null,
            }
        }
        case profileActionTypes.UPDATE_MANAGER_DETAILS_FAILURE: {
            return {
                ...state,
                updatingManagerDetails: false,
                updateManagerDetailsError: action.payload,
            }
        }

        
        //start
        case profileActionTypes.UPDATE_OWNER_DETAILS_START: {
            return {
                ...state,
                updatingOwnerDetails: true,
                updateOwnerDetailsError: null,
            }
        }
        case profileActionTypes.UPDATE_OWNER_DETAILS_SUCCESS: {
            const newOwnerDetails = { 
                ...state.ownerDetails, 
                ...action.payload 
            };
            return {
                ...state,
                ownerDetails: newOwnerDetails,
                updatingOwnerDetails: false,
                updateOwnerDetailsError: null,
            }
        }
        case profileActionTypes.UPDATE_OWNER_DETAILS_FAILURE: {
            return {
                ...state,
                updatingOwnerDetails: false,
                updateOwnerDetailsError: action.payload,
            }
        }
        // case profileActionTypes.CREATE_FARE: {
        //     return {
        //         ...state,
        //         fares: [...state.fares, action.payload]
        //     }
        // }
        // case profileActionTypes.DELETE_FARE: {
        //     return {
        //         ...state,
        //     }
        // }
        default: {
            return state;
        }
    }
}

export default profileReducer;
import profileActionTypes from '../types/profile';

const initialState = {
    fares: [],
    agents: [],
    companyDetails: {},
    providerDetails: {},
    managerDetails: {},
    insuranceDetails: {},
    pricingPreference: {},
    ownerDetails: {},
    identification: {},
    fetchingFares: false,
    fetchFaresError: null,
    fetchingManager: false,
    fetchingManagerError: null,
    updatingManagerDetails: false,
    updatingManagerDetailsError: null,
    fetchingCompanyDetails: false,
    fetchCompanyDetailsError: null,
    fetchingProvider: false,
    fetchingProviderError: null,
    fetchingOwner: false,
    fetchingOwnerError: null,
    updatingOwnerDetails: false,
    updatingOwnerDetailsError: null,
    fetchingIdentification: false,
    fetchingIdentificationError: null,
    updatingIdentificationDetails: false,
    updatingIdentificationError: null,
    fetchingInsurance: false,
    fetchingInsuranceError: null,
    updatingInsuranceDetails: false,
    updatingInsuranceError: null,
    fetchingPricingPreference: false,
    fetchingPricingPreferenceError: null,
    updatingPricingPreference: false,
    updatingPricingPreferenceError: null,
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
            const profile = {
                ...state.providerDetails,
                ...action.payload,
            };
            return {
                ...state,
                providerDetails: profile,
                fetchingProvider: false,
                fetchProviderError: null,
            }
        }
        case profileActionTypes.FETCH_PROFILE_FAILURE: {
            return {
                ...state,
                fetchingProfile: false,
                fetchProfileError: action.payload,
            }
        }

        case profileActionTypes.FETCH_COMPANY_DETAILS_START: {
            return {
                ...state,
                fetchingCompanyDetails: true,
                fetchCompanyDetailsError: null,
            }
        }
        case profileActionTypes.FETCH_COMPANY_DETAILS_SUCCESS: {
            const companies = {
                ...state.companyDetails,
                ...action.payload,
            };
            return {
                ...state,
                companyDetails: companies,
                fetchingCompanyDetails: false,
                fetchCompanyDetailsError: null,
            }
        }
        case profileActionTypes.FETCH_COMPANY_DETAILS_FAILURE: {
            return {
                ...state,
                fetchingCompanyDetails: false,
                fetchCompanyDetailsError: action.payload,
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
                updatingManagerDetailsError: null,
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
                updatingManagerDetailsError: null,
            }
        }
        case profileActionTypes.UPDATE_MANAGER_DETAILS_FAILURE: {
            return {
                ...state,
                updatingManagerDetails: false,
                updatingManagerDetailsError: action.payload,
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
        case profileActionTypes.FETCH_OWNER_DETAILS_START: {
            return {
                ...state,
                fetchingOwner: true,
                fetchingOwnerError: null,
            }
        }
        case profileActionTypes.FETCH_OWNER_DETAILS_SUCCESS: {
            const owner = {
                ...state.ownerDetails,
                ...action.payload,
            };
            return {
                ...state,
                ownerDetails: owner,  
                fetchingOwner: false,
                fetchingOwnerError: null,
            }
        }
        case profileActionTypes.FETCH_OWNER_DETAILS_FAILURE: {
            return {
                ...state,
                fetchingOwner: false,
                fetchingOwnerError: action.payload,
            }
        }

        case profileActionTypes.FETCH_MANAGER_DETAILS_START: {
            return {
                ...state,
                fetchingManager: true,
                fetchManagerError: null,
            }
        }
        case profileActionTypes.FETCH_MANAGER_DETAILS_SUCCESS: {
            const owner = {
                ...state.managerDetails,
                ...action.payload,
            };
            return {
                ...state,
                managerDetails: owner,  
                fetchingManager: false,
                fetchManagerError: null,
            }
        }
        case profileActionTypes.FETCH_MANAGER_DETAILS_FAILURE: {
            return {
                ...state,
                fetchingManager: false,
                fetchManagerError: action.payload,
            }
        }

        // Identification
        case profileActionTypes.UPDATE_IDENTIFICATION_DETAILS_START: {
            return {
                ...state,
                updatingIdentificationDetails: true,
                updatingIdentificationError: null,
            }
        }
        case profileActionTypes.UPDATE_IDENTIFICATION_DETAILS_SUCCESS: {
            const newIdentificationDetails = { 
                ...state.identification, 
                ...action.payload 
            };
            return {
                ...state,
                identification: newIdentificationDetails,
                updatingIdentificationDetails: false,
                updatingIdentificationError: null,
            }
        }
        case profileActionTypes.UPDATE_IDENTIFICATION_DETAILS_FAILURE: {
            return {
                ...state,
                updatingIdentificationDetails: false,
                updatingIdentificationError: action.payload,
            }
        }
        case profileActionTypes.FETCH_IDENTIFICATION_DETAILS_START: {
            return {
                ...state,
                fetchingIdentification: true,
                fetchingIdentificationError: null,
            }
        }
        case profileActionTypes.FETCH_IDENTIFICATION_DETAILS_SUCCESS: {
            const identification = {
                ...state.identification,
                ...action.payload,
            };
            return {
                ...state,
                identification: identification,  
                fetchingIdentification: false,
                fetchingIdentificationError: null,
            }
        }
        case profileActionTypes.FETCH_IDENTIFICATION_DETAILS_FAILURE: {
            return {
                ...state,
                fetchingIdentification: false,
                fetchingIdentificationError: action.payload,
            }
        }

         // Insurance
         case profileActionTypes.UPDATE_INSURANCE_DETAILS_START: {
            return {
                ...state,
                updatingInsuranceDetails: true,
                updatingInsuranceError: null,
            }
        }
        case profileActionTypes.UPDATE_INSURANCE_DETAILS_SUCCESS: {
            const newInsuranceDetails = { 
                ...state.insuranceDetails, 
                ...action.payload 
            };
            return {
                ...state,
                insuranceDetails: newInsuranceDetails,
                updatingInsuranceDetails: false,
                updatingInsuranceError: null,
            }
        }
        case profileActionTypes.UPDATE_INSURANCE_DETAILS_FAILURE: {
            return {
                ...state,
                updatingInsuranceDetails: false,
                updatingInsuranceError: action.payload,
            }
        }
        case profileActionTypes.FETCH_INSURANCE_DETAILS_START: {
            return {
                ...state,
                fetchingInsurance: true,
                fetchingInsuranceError: null,
            }
        }
        case profileActionTypes.FETCH_INSURANCE_DETAILS_SUCCESS: {
            const insurance = {
                ...state.insuranceDetails,
                ...action.payload,
            };
            return {
                ...state,
                insuranceDetails: insurance,  
                fetchingInsurance: false,
                fetchingInsuranceError: null,
            }
        }
        case profileActionTypes.FETCH_INSURANCE_DETAILS_FAILURE: {
            return {
                ...state,
                fetchingInsurance: false,
                fetchingInsuranceError: action.payload,
            }
        }

        // Pricing Preference
        case profileActionTypes.UPDATE_PRICING_PREFERENCE_START: {
            return {
                ...state,
                updatingPricingPreferenceDetails: true,
                updatingPricingPreferenceError: null,
            }
        }
        case profileActionTypes.UPDATE_PRICING_PREFERENCE_SUCCESS: {
            const newPricingPreferenceDetails = { 
                ...state.pricingPreference, 
                ...action.payload 
            };
            return {
                ...state,
                pricingPreference: newPricingPreferenceDetails,
                updatingPricingPreferenceDetails: false,
                updatingPricingPreferenceError: null,
            }
        }
        case profileActionTypes.UPDATE_PRICING_PREFERENCE_FAILURE: {
            return {
                ...state,
                updatingPricingPreferenceDetails: false,
                updatingPricingPreferenceError: action.payload,
            }
        }
        case profileActionTypes.FETCH_PRICING_PREFERENCE_START: {
            return {
                ...state,
                fetchingPricingPreference: true,
                fetchingPricingPreferenceError: null,
            }
        }
        case profileActionTypes.FETCH_PRICING_PREFERENCE_SUCCESS: {
            const pricing = {
                ...state.pricingPreference,
                ...action.payload,
            };
            return {
                ...state,
                pricingPreference: pricing,  
                fetchingPricingPreference: false,
                fetchingPricingPreferenceError: null,
            }
        }
        case profileActionTypes.FETCH_PRICING_PREFERENCE_FAILURE: {
            return {
                ...state,
                fetchingPricingPreference: false,
                fetchingPricingPreferenceError: action.payload,
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
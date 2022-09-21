import profileActionTypes from '../types/profile';
import { endpoints, getHeaders } from '../helpers/api';

export const fetchProfileStart = () => {
    return {
        type: profileActionTypes.FETCH_PROFILE_START,
    };
}

export const fetchProfileSuccess = (payload) => {
    return {
        type: profileActionTypes.FETCH_PROFILE_SUCCESS,
        payload,
    };
}

export const fetchProfileFailure = (payload) => {
    return {
        type: profileActionTypes.FETCH_PROFILE_FAILURE,
        payload
    }
}

export const updateCompanyDetailsStart = () => {
    return {
        type: profileActionTypes.UPDATE_COMPANY_DETAILS_START,
    };
}

export const updateCompanyDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.UPDATE_COMPANY_DETAILS_SUCCESS,
        payload,
    };
}

export const updateCompanyDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.UPDATE_COMPANY_DETAILS_FAILURE,
        payload
    }
}

export const updateManagerDetailsStart = () => {
    return {
        type: profileActionTypes.UPDATE_MANAGER_DETAILS_START,
    };
}

export const updateManagerDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.UPDATE_MANAGER_DETAILS_SUCCESS,
        payload,
    };
}

export const updateManagerDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.UPDATE_MANAGER_DETAILS_FAILURE,
        payload
    }
}

// Identification
export const updateIdentificationDetailsStart = () => {
    return {
        type: profileActionTypes.UPDATE_IDENTIFICATION_DETAILS_START,
    };
}

export const updateIdentificationDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.UPDATE_IDENTIFICATION_DETAILS_SUCCESS,
        payload,
    };
}

export const updateIdentificationDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.UPDATE_IDENTIFICATION_DETAILS_FAILURE,
        payload
    }
}

export const fetchIdentificationDetailsStart = () => {
    return {
        type: profileActionTypes.FETCH_IDENTIFICATION_DETAILS_START,
    };
}

const fetchIdentificationDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.FETCH_IDENTIFICATION_DETAILS_SUCCESS,
        payload,
    };
}

export const fetchIdentificationDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.FETCH_IDENTIFICATION_DETAILS_FAILURE,
        payload
    }
}

// Insurance
export const updateInsuranceDetailsStart = () => {
    return {
        type: profileActionTypes.UPDATE_INSURANCE_DETAILS_START,
    };
}

export const updateInsuranceDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.UPDATE_INSURANCE_DETAILS_SUCCESS,
        payload,
    };
}

export const updateInsuranceDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.UPDATE_INSURANCE_DETAILS_FAILURE,
        payload
    }
}

export const fetchInsuranceDetailsStart = () => {
    return {
        type: profileActionTypes.FETCH_INSURANCE_DETAILS_START,
    };
}

const fetchInsuranceDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.FETCH_INSURANCE_DETAILS_SUCCESS,
        payload,
    };
}

export const fetchInsuranceDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.FETCH_INSURANCE_DETAILS_FAILURE,
        payload
    }
}

// Pricing
export const updatePricingStart = () => {
    return {
        type: profileActionTypes.UPDATE_PRICING_PREFERENCE_START,
    };
}

export const updatePricingSuccess = (payload) => {
    return {
        type: profileActionTypes.UPDATE_PRICING_PREFERENCE_SUCCESS,
        payload,
    };
}

export const updatePricingFailure = (payload) => {
    return {
        type: profileActionTypes.UPDATE_PRICING_PREFERENCE_FAILURE,
        payload
    }
}

export const fetchPricingStart = () => {
    return {
        type: profileActionTypes.FETCH_PRICING_PREFERENCE_START,
    };
}

const fetchPricingSuccess = (payload) => {
    return {
        type: profileActionTypes.FETCH_PRICING_PREFERENCE_SUCCESS,
        payload,
    };
}

export const fetchPricingFailure = (payload) => {
    return {
        type: profileActionTypes.FETCH_PRICING_PREFERENCE_FAILURE,
        payload
    }
}

//start
export const updateOwnerDetailsStart = () => {
    return {
        type: profileActionTypes.UPDATE_OWNER_DETAILS_START,
    };
}

export const updateOwnerDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.UPDATE_OWNER_DETAILS_SUCCESS,
        payload,
    };
}

export const updateOwnerDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.UPDATE_OWNER_DETAILS_FAILURE,
        payload
    }
}

export const updateFareStart = () => {
    return {
        type: profileActionTypes.UPDATE_FARE_START,
    };
}

export const updateFareSuccess = (payload) => {
    return {
        type: profileActionTypes.UPDATE_FARE_SUCCESS,
        payload,
    };
}

export const updateFareFailure = (payload) => {
    return {
        type: profileActionTypes.UPDATE_FARE_FAILURE,
        payload
    }
}

export const createFareStart = () => {
    return {
        type: profileActionTypes.CREATE_FARE_START,
    };
}

export const createFareSuccess = (payload) => {
    return {
        type: profileActionTypes.CREATE_FARE_SUCCESS,
        payload,
    };
}

export const createFareFailure = (payload) => {
    return {
        type: profileActionTypes.CREATE_FARE_FAILURE,
        payload
    }
}

export const fetchFaresStart = () => {
    return {
        type: profileActionTypes.FETCH_FARES_START,
    };
}

const fetchFaresSuccess = (payload) => {
    return {
        type: profileActionTypes.FETCH_FARES_SUCCESS,
        payload,
    };
}

export const fetchFaresFailure = (payload) => {
    return {
        type: profileActionTypes.FETCH_FARES_FAILURE,
        payload
    }
}

export const deleteFareStart = () => {
    return {
        type: profileActionTypes.DELETE_FARE_START,
    };
}

const deleteFareSuccess = (payload) => {
    return {
        type: profileActionTypes.DELETE_FARE_SUCCESS,
        payload,
    };
}

export const deleteFareFailure = (payload) => {
    return {
        type: profileActionTypes.DELETE_FARE_FAILURE,
        payload
    }
}

export const fetchOwnerDetailsStart = () => {
    return {
        type: profileActionTypes.FETCH_OWNER_DETAILS_START,
    };
}

const fetchOwnerDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.FETCH_OWNER_DETAILS_SUCCESS,
        payload,
    };
}

export const fetchOwnerDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.FETCH_OWNER_DETAILS_FAILURE,
        payload
    }
}


export const fetchManagerDetailsStart = () => {
    return {
        type: profileActionTypes.FETCH_MANAGER_DETAILS_START,
    };
}

const fetchManagerDetailsSuccess = (payload) => {
    return {
        type: profileActionTypes.FETCH_MANAGER_DETAILS_SUCCESS,
        payload,
    };
}

export const fetchManagerDetailsFailure = (payload) => {
    return {
        type: profileActionTypes.FETCH_MANAGER_DETAILS_FAILURE,
        payload
    }
}


export const fetchFares = () => dispatch => {
    dispatch(fetchFaresStart())
    fetch(endpoints.API_HOME + '/providers/fares', {
        headers: getHeaders(true),
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                dispatch(fetchFaresFailure("Oops. An error occured."));
            }
        })
        .then(data => {
            dispatch(fetchFaresSuccess(data.payload));
        }).catch(err => {
            console.error(err.message);
            dispatch(fetchFaresFailure("Network error."));
        });
}

export const createFare = rate => async (dispatch) => {
    dispatch(createFareStart())
    const res = await fetch(endpoints.API_HOME + '/providers/fares', {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(rate)
    }).catch(err => {
        console.error(err.message);
    });
    if (res && res.status === 201) {
        return res.json()
            .then(data => {
                // alert(data.message)
                dispatch(createFareSuccess(data))
            })
    } else {
        dispatch(createFareFailure("An error occured."));
    }
}

export const deleteFare = (id) => dispatch => {
    dispatch(deleteFareStart())
    fetch(endpoints.API_HOME + `/provider/flat-rates/${id}`, {
        method: "DELETE",
        headers: getHeaders(true),
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                dispatch(deleteFareFailure("Oops. An error occured."));
            }
        })
        .then(data => {
            dispatch(deleteFareSuccess(id));
        }).catch(err => {
            console.error(err.message);
        });
}

export const updateFare = (rate) => dispatch => {
    dispatch(updateFareStart())
    fetch(endpoints.API_HOME + `/provider/flat-rates`, {
        method: "PUT",
        headers: getHeaders(true),
        body: JSON.stringify(rate)
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                dispatch(updateFareFailure("Oops. An error occured."));
            }
        })
        .then(data => {
            dispatch(updateFareSuccess(rate));
        }).catch(err => {
            console.error(err.message);
        });
}

export const fetchProfile = () => dispatch => {
    dispatch(fetchProfileStart())
    fetch(endpoints.API_HOME + '/providers/profile', {
        headers: getHeaders(true),
    })
        .then(res => {
            if (res.status === 200) {
                return res.json().then(data => {
                    dispatch(fetchProfileSuccess(data.payload));
                });
            } else {
                dispatch(fetchProfileFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.log(err.message);
            dispatch(fetchProfileFailure("Network error."));
        });
}

export const updateCompanyDetails = (data) => dispatch => {
    dispatch(updateCompanyDetailsStart());
    fetch(endpoints.API_HOME + `/providers/`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (res.status === 200) {
                await res.json();
                dispatch(updateCompanyDetailsSuccess(data));
            } else {
                dispatch(updateCompanyDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}




export const updateOwnerDetails = (data) => dispatch => {
    dispatch(updateOwnerDetailsStart());
    fetch(endpoints.API_HOME2 + `/owner/update`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                console.log(resp);
                dispatch(updateOwnerDetailsSuccess(data));
            } else {
                dispatch(updateOwnerDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const getOwnerDetails = () => dispatch => {
    dispatch(fetchOwnerDetailsStart());
    fetch(endpoints.API_HOME2 + `/owner/`, {
        headers: getHeaders(true),
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                dispatch(fetchOwnerDetailsSuccess(resp.data));
            } else {
                dispatch(fetchOwnerDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const getManagerDetails = () => dispatch => {
    dispatch(fetchManagerDetailsStart());
    fetch(endpoints.API_HOME2 + `/manager/`, {
        headers: getHeaders(true),
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                dispatch(fetchManagerDetailsSuccess(resp.data));
            } else {
                dispatch(fetchManagerDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const updateManagerDetails = (data) => dispatch => {
    dispatch(updateManagerDetailsStart());
    fetch(endpoints.API_HOME2 + `/manager/update`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                console.log(resp);
                dispatch(updateManagerDetailsSuccess(data));
            } else {
                dispatch(updateManagerDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const getIdentificationDetails = () => dispatch => {
    dispatch(fetchIdentificationDetailsStart());
    fetch(endpoints.API_HOME2 + `/identification/`, {
        headers: getHeaders(true),
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                dispatch(fetchIdentificationDetailsSuccess(resp.data));
            } else {
                dispatch(fetchIdentificationDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const updateIdentificationDetails = (data) => dispatch => {
    dispatch(updateIdentificationDetailsStart());
    fetch(endpoints.API_HOME2 + `/identification/update`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                console.log(resp);
                dispatch(updateIdentificationDetailsSuccess(data));
            } else {
                dispatch(updateIdentificationDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const getInsuranceDetails = () => dispatch => {
    dispatch(fetchInsuranceDetailsStart());
    fetch(endpoints.API_HOME2 + `/insurance/`, {
        headers: getHeaders(true),
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                dispatch(fetchInsuranceDetailsSuccess(resp.data));
            } else {
                dispatch(fetchInsuranceDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const updateInsuranceDetails = (data) => dispatch => {
    dispatch(updateInsuranceDetailsStart());
    fetch(endpoints.API_HOME2 + `/insurance/update`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                console.log(resp);
                dispatch(updateInsuranceDetailsSuccess(data));
            } else {
                dispatch(updateInsuranceDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const getPricing = () => dispatch => {
    dispatch(fetchPricingStart());
    fetch(endpoints.API_HOME2 + `/pricing/`, {
        headers: getHeaders(true),
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                dispatch(fetchPricingSuccess(resp.data));
            } else {
                dispatch(fetchPricingFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

export const updatePricing = (data) => dispatch => {
    dispatch(updatePricingStart());
    console.log(data);
    fetch(endpoints.API_HOME2 + `/pricing/update`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (res.status === 200) {
                const resp = await res.json();
                console.log(resp);
                dispatch(updatePricingSuccess(data));
            } else {
                dispatch(updatePricingFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}
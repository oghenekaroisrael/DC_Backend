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
    fetch(endpoints.API_HOME + '/providers/', {
        headers: getHeaders(true),
    })
        .then(res => {
            if (res.status === 200) {
                return res.json().then(data => {
                    dispatch(fetchProfileSuccess(data));
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

export const updateManagerDetails = (data) => dispatch => {
    dispatch(updateManagerDetailsStart());
    fetch(endpoints.API_HOME + `/provider/manager`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify(data)
    })
        .then(async res => {
            if (res.status === 200) {
                await res.json();
                dispatch(updateManagerDetailsSuccess(data));
            } else {
                dispatch(updateManagerDetailsFailure("Oops. An error occured."));
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
                await res.json();
                dispatch(updateOwnerDetailsSuccess(data));
            } else {
                dispatch(updateOwnerDetailsFailure("Oops. An error occured."));
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}
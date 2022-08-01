import assetActionTypes from '../types/assets';
import { endpoints, getHeaders } from '../helpers/api';
// import { signupStarted } from './auth';

export const createAssetStart = () => {
    return {
        type: assetActionTypes.CREATE_ASSETS_START,
    };
}

export const createAssetSuccess = (payload) => {
    return {
        type: assetActionTypes.CREATE_ASSETS_SUCCESS,
        payload,
    };
}

export const createAssetFailure = (payload) => {
    return {
        type: assetActionTypes.CREATE_ASSETS_FAILURE,
        payload,
    }
}

export const createAsset = asset => async (dispatch) => {
    dispatch(createAssetStart())
    const res = await fetch(endpoints.API_HOME + '/providers/assets', {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(asset)
    }).catch(err => {
        console.error(err.message);
    });
    if (res && res.status === 201) {
        return res.json()
            .then(data => {
                // alert(data.message)
                dispatch(createAssetSuccess(data))
            })
    } else {
        dispatch(createAssetFailure("An error occured."));
    }
}

export const fetchAssetStart = () => {
    return {
        type: assetActionTypes.FETCH_ASSETS_START,
    }
}

export const fetchAssetSucess = (payload) => {
    return {
        type: assetActionTypes.FETCH_ASSETS_SUCCESS,
        payload,
    }
}

export const fetchAssetFailure = (payload) => {
    return {
        type: assetActionTypes.FETCH_ASSETS_FAILURE,
        payload,
    }
}

export const fetchAssets = () => dispatch => {
    dispatch(fetchAssetStart());
    fetch(endpoints.API_HOME + '/providers/assets', {
        headers: getHeaders(true)
    })
        .then (res => {
            if (res.status === 200) {
                return res.json();
            } else {
                dispatch(fetchAssetFailure("Oops. An Error Occured"))
            }
        })
        .then (data => {
            dispatch(fetchAssetSucess(data.payload));
        }).catch(err => {
            dispatch(fetchAssetFailure("Oops. An Error Occured"))
        })


}

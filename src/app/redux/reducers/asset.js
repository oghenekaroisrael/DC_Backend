import assetActionTypes from '../types/assets';

const initialState = {
    assets: [],
    creatingAssets: null,
    creatingAssetsError: null,
    fetchingAssets: false,
    fetchAssetsError: null,
};

const assetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case assetActionTypes.CREATE_ASSETS_START: {
            return {
                ...state,
                creatingAssets: true,
                creatingAssetsError: null,
            }
        }
        case assetActionTypes.CREATE_ASSETS_SUCCESS: {
            return {
                ...state,
                creatingAssets: false,
                creatingAssetsError: null,
            }
        }
        case assetActionTypes.CREATE_ASSETS_FAILURE: {
            return {
                ...state,
                creatingAssets: false,
                creatingAssetsError: action.payload,
            }
        }
        case assetActionTypes.FETCH_ASSETS_START: {
            return {
                ...state,
                fetchingAssets: true,
                fetchAssetsError: null,
            }
        }
        case assetActionTypes.FETCH_ASSETS_SUCCESS: {
            return {
                ...state,
                fetchingAssets: false,
                fetchAssetsError: null,
                assets: action.payload,
            }
        }
        case assetActionTypes.FETCH_ASSETS_FAILURE: {
            return {
                ...state,
                fetchingAssets: false,
                fetchAssetsError: action.payload,
            }
        }
        default: {
            return state;
        }

    }
}

export default assetsReducer; 
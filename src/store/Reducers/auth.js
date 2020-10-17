import * as actionTypes from '../Actions/ActionTypes';
import { updateObject } from '../utility';

const initialstate = {
    user: null,
    error: null,
    loading: false,
    usersAllDetail: null,
    errorExtra: null,
    filterContractors: null,
    clientsWorks: null,
    clientsWorksforcontractor: null,
    selectedcontractorinfo: null,
    contractorbids: null
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const extraFail = (state, action) => {
    return updateObject(state, {
        errorExtra: action.errorExtra,
        loading: false
    });
}

const allContractors = (state, action) => {
    return updateObject(state, {
        filterContractors: action.filterContractors
    })
}

const userStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const userSuccess = (state, action) => {
    return updateObject(state, {
        usersAllDetail: action.users,
        error: null,
        user: action.user,
        loading: false
    });
}

const userFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const getClientworks = (state, action) => {
    return updateObject(state, {
        loading: false,
        clientsWorks: action.clientsWorks
    })
}

const getClientForContractor = (state, action) => {
    return updateObject(state, {
        loading: false,
        clientsWorksforcontractor: action.clientsWorksforcontractor
    })
}

const getParticularContractorInfo = (state, action) => {
    return updateObject(state, {
        loading: false,
        selectedcontractorinfo: action.selectedcontractorinfo
    })
}

const getContractorBids = (state, action) => {
    return updateObject(state, {
        loading: false,
        contractorbids: action.contractorbids
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        user: null,
    });
}

const reducer = (state = initialstate, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.EXTRA_FAIL: return extraFail(state, action);
        case actionTypes.USER_START: return userStart(state, action);
        case actionTypes.USER_SUCCESS: return userSuccess(state, action);
        case actionTypes.USER_FAIL: return userFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.ALL_CONTRACTORS: return allContractors(state, action);
        case actionTypes.GET_WORKS_CLIENTS: return getClientworks(state, action);
        case actionTypes.GET_CLIENT_WORKS_FOR_CONTRACTOR: return getClientForContractor(state, action);
        case actionTypes.GET_SELECTED_CONTRACTOR_INFORMATION: return getParticularContractorInfo(state, action);
        case actionTypes.CONTRACTOR_BIDS: return getContractorBids(state, action);
        default:
            return state;
    }
}

export default reducer;
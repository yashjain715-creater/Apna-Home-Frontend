import * as actionTypes from './ActionTypes';
import Cookie from 'js-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true;

var API_BASE_URL = 'http://127.0.0.1:8000'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: token
    };
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const extraFail = error => {
    return {
        type: actionTypes.EXTRA_FAIL,
        errorExtra: error
    };
}

export const userStart = () => {
    return {
        type: actionTypes.USER_START
    };
}

export const userSuccess = (users) => {
    return {
        type: actionTypes.USER_SUCCESS,
        users: users
    };
}

export const userFail = error => {
    return {
        type: actionTypes.USER_FAIL,
        error: error
    };
}

export const allContractors = data => {
    return {
        type: actionTypes.ALL_CONTRACTORS,
        filterContractors: data
    }
}

export const getClientworks = data => {
    return {
        type: actionTypes.GET_WORKS_CLIENTS,
        clientsWorks: data
    }
}

export const getClientForContractor = data => {
    return {
        type: actionTypes.GET_CLIENT_WORKS_FOR_CONTRACTOR,
        clientsWorksforcontractor: data
    }
}

export const getParticularContractorInfo = data => {
    return {
        type: actionTypes.GET_SELECTED_CONTRACTOR_INFORMATION,
        selectedcontractorinfo: data
    }
}

export const getContractorBids = data => {
    return {
        type: actionTypes.CONTRACTOR_BIDS,
        contractorbids: data
    }
}

export const logout = () => {
    Cookie.remove('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}


export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        axios({
            url: API_BASE_URL + '/login/',
            method: 'POST',
            data: {
                email: email,
                password: password
            },
          withCredentials: true  
        })
        .then(
            res => {
                console.log(res.data);
                const token = res.data.token;
                const user = res.data.user;
                const timeExpire = new Date(new Date().getTime() + 60 * 60 * 1000);
                Cookie.set('token',token, {expires: timeExpire})
                dispatch(authSuccess(user));
                dispatch(LoggedinUserdetails(token));
            }
        )
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const authLogout = () => {
    return dispatch => {
        axios.post(API_BASE_URL + '/rest-auth/logout/')
        .then(res => {
            dispatch(logout());
        })
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const authSignup = (firstname, lastname, email, password1, password2, selectype) => {
    console.log(firstname, lastname, email, password1, password2, selectype)
    return dispatch => {
        axios.post(API_BASE_URL + '/registration/', {
            email: email,
            password1: password1,
            password2: password2,
            first_name: firstname,
            last_name: lastname,
            occupation: selectype
        },)
        .catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const extraSignup = (location, tags, ph_num, address, experience, firm) => {
    return dispatch => {
        dispatch(authStart());
        console.log()
        const token = Cookie.get('token');
        console.log(token)
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.post(API_BASE_URL + '/extra/create', {
            location: location,
            tags: tags,
            ph_num: ph_num,
            address: address,
            experience: experience,
            firm_name: firm
        })
        .then(res => {
            dispatch(userSuccess(res.data));
        })
         .catch(err => {
            dispatch(extraFail(err));
        })
    }
}

export const ParticularContractorInfo = (id) => {
    return dispatch => {
        axios.get(API_BASE_URL + `/contractors/${id}`)
        .then(res => {
            dispatch(getParticularContractorInfo(res.data));
        })
        .catch(err => console.log(err))
    }
}

export const extraContractorUpdate = (dataC) => {
    return dispatch => {
        dispatch(authStart());
        var json = JSON.stringify(dataC)
        const token = Cookie.get('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.put(API_BASE_URL +'/extra/', json)
        .then(res => {
            console.log(res.data);
            dispatch(userSuccess(res.data));
        })
         .catch(err => {
            dispatch(extraFail(err));
        })
    }
}

export const extraClientUpdate = (dataC) => {
    return dispatch => {
        dispatch(authStart());
        console.log(dataC)
        var json = JSON.stringify(dataC)
        console.log(json)
        const token = Cookie.get('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.put(API_BASE_URL +'/extra/', json)
        .then(res => {
            console.log(res.data);
            dispatch(userSuccess(res.data));
        })
         .catch(err => {
            dispatch(extraFail(err));
        })
    }
}

export const DeleteClientWorkFromClientSide = (id) => {
    return dispatch => {
        const token = Cookie.get('token')
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.delete(API_BASE_URL + `/work/${id}/delete`)
        .then(res => {
            console.log(res.data)
            dispatch(GetClientsWorks());
        })
        .catch(err => console.log(err))
    }
}

export const extraClientSignup = () => {
    return dispatch => {
        const token = Cookie.get('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.post(API_BASE_URL +'/extra/create', {
            ph_num: '9752396476'
        })
        .then(res => {
            dispatch(userSuccess(res.data));
        })
         .catch(err => {
            dispatch(extraFail(err));
        })
    }
}

export const SendClientWork = (price, work_type, area, description, id) => {
    return dispatch => {
        const token = Cookie.get('token');
        console.log(token, work_type, price, id)
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.post(API_BASE_URL + '/work/create/', {
            work_type: work_type,
            price: price,
            favoured_contractor_id: id,
            description: description,
            area: area
        })
        .then(res => {
            console.log(res.data)
        })
         .catch(err => {
            console.log(err)
        })
    }
}

export const GetContractorBids = () => {
    return dispatch => {
        const token = Cookie.get('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.get(API_BASE_URL + '/bid/all/')
        .then(res => {
            dispatch(getContractorBids(res.data))
        })
        .catch(err => console.log(err))
    }
}

export const sendInitialBid = (id, bid, remark) => {
    return dispatch => {
        const token = Cookie.get('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.post(API_BASE_URL + `/work/${id}/bid/create/`, {
            bid_amount: bid,
            remarks: remark
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
}

export const GetClientsWorks = () => {
    return dispatch => {
        const token = Cookie.get('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.get(API_BASE_URL+'/work/created/',)
        .then(res => {
            console.log(res.data);
            dispatch(getClientworks(res.data));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const GetClientsWorksForContractors = (tags) => {
    return dispatch => {
        var part = tags.substring(1,tags.length-1)
        var dataC = part.split(", ")
        var str = ''
        for (let i = 0; i < dataC.length; i++) {
            str += '?tag='
            str += dataC[i]
            str += '&'
        }
       
        const token = Cookie.get('token')
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.get(API_BASE_URL + '/work/available' +`/${str.substring(0, str.length-1)}` +'/')
        .then(res => dispatch(getClientForContractor(res.data)))
        .catch(err => console.log(err))
    }
}

export const LoggedinUserdetails = (token) => {
    return dispatch => {
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + token
        };
        axios.get(API_BASE_URL + '/extra/', {
            
        })
        .then(
            res => {
                dispatch(userSuccess(res.data));
            }
        )
        .catch(
            err => {
                console.log(err.detail)
            }
        )
    }
}

export const filteringContractors = (city, type) => {
    return dispatch => {
        axios.get(API_BASE_URL + `/contractors/?loc=${city}&tags=${type}`,)
        .then(
            res => {
                dispatch(allContractors(res.data));
                console.log(res.data);
            }
        )
        .catch(
            err => {
                console.log(err.detail)
            }
        )
    }
}

export const getAllContractors = () => {
    return dispatch => {
        axios.get(API_BASE_URL + '/contractors/',)
        .then(
            res => {
                dispatch(allContractors(res.data));
                console.log(res.data);
            }
        )
        .catch(
            err => {
                console.log(err.detail)
            }
        )
    }
}

export const authcheckstate = () => {
    return dispatch => {
        const cookie = Cookie.get('token')
        if(cookie !== undefined) {
            dispatch(authSuccess(cookie));
            dispatch(LoggedinUserdetails(cookie));
        } else{
            Cookie.remove('token');
        }
    }
}

export const filtercheckstate = (city, type) => {
    return dispatch => {
        dispatch(filteringContractors(city, type));
    }
}

export const Allcheckstate = () => {
    return dispatch => {
        dispatch(getAllContractors());
    }
}



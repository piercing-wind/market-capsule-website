import Axios from 'axios';
const AxiosInstance = Axios.create({
    baseURL: process.env.API + '/api/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});
const updateMutipart = (reset) => {
    if (reset) {
        AxiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data'
    } else {
        AxiosInstance.defaults.headers['Content-Type'] = 'application/json'
    }
}
const setAuthorizationToken = (token) => {
    AxiosInstance.defaults.headers.common.Authorization =
        token
            ? `Bearer ${token}`
            : token;
};


//post method function to use call post method
const postMethod = async (endpoint, data, params = {}) => {        //post method create
    return new Promise((resolve, reject) => {
        var config = {
            method: 'post',
            url: endpoint,
            data: data,
            params: params
        };
        AxiosInstance(config).then(response => {
            resolve(response.data);
        }, error => {
            reject(error.response.data);
        })
    });
}

//get method function to use call get method
const getMethod = async (endpoint, params = {}) => {       //get methods
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: endpoint,
            params: params
        };
        AxiosInstance(config).then(response => {
            resolve(response.data)
        }, error => {
            if (!error.response || error.code === 'ECONNABORTED') {
                reject({ status: false, message: 'error!', statusCode: 500 })
            } else {
                reject(error.response.data)
            }
        })
    })
}


//put method function to use call put  method
const putMethod = async (endpoint, data, params = {}) => {        //post method create
    return new Promise((resolve, reject) => {
        var config = {
            method: 'put',
            url: endpoint,
            data: data,
            params: params
        };
        AxiosInstance(config).then(response => {
            resolve(response.data);
        }, error => {
            reject(error.response.data);
        })
    });
}

export { postMethod, getMethod, putMethod, setAuthorizationToken, updateMutipart };
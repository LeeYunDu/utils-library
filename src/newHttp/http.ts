import axios from 'axios';
let serverApi ='http://192.168.0.28:9051';


// 是否开启 session
axios.defaults.withCredentials = false; 

axios.interceptors.request.use((config) => {
    return config;
}, (err) => {
    console.log('请求超时!');
    return Promise.resolve(err);
});
// 返回数据拦截器
// axios.interceptors.response.use((data) => {
//     if (data.status && data.status === 200 && data.data.type === 3) {
//         console.log(data.data.message, '提示信息');
//         return ;
//     }
//     return data;
// }, (err) => {
//     if (err.response.status === 504 || err.response.status === 404) {
//         console.log('服务器错误');
//     } else if (err.response.status === 403) {
//         console.log('权限不足，请联系管理员');
//     } else {
//         // 500错误
//         console.log('未知错误!');
//     }
//     return Promise.resolve(err);
// });



export const postRequest = (url: string ,params: any) => {
    return axios({
        method: 'post',
        url: `${serverApi}${url}`,
        data:params,
        headers: {
            'Content-Type':'application/json',
        },
    });
};
export const getRequest = (url: string ,params: any) => {
    return axios({
        method: 'get',
        url: `${serverApi}${url}`,
        data:params,
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
        },
    });
};
export const fileRequest = (url: string ,params: any) => {
    return axios({
        method: 'post',
        url: `${serverApi}${url}`,
        data:params,
        headers: {
            'Content-Type':'application/form-data;charset=UTF-8',
        },
    });
};



import axios from 'axios';

const instance = axios.create({
    baseURL: `https://us-central1-realreba-c557f.cloudfunctions.net/`
});

// instance.interceptors.request.use(request => {
//     console.log('Starting Request', request);
//     return request
// });
//
// instance.interceptors.response.use(response => {
//     console.log('Response:', response);
//     return response
// });

export default instance;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-ac1c8.firebaseio.com/',
});

export default instance;
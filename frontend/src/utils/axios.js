import axios from 'axios';

const option = {
    baseURL: `${process.env.API_URL}/${process.env.API_CURRENT_VERSION}`,
    headers: {
        'Content-Type': 'application/json',
    },
};

const service = axios.create(option);

export default service;

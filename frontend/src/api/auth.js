import service from '~/utils/axios';

export const fetchLogin = (credentials) => new Promise((resolve, reject) => {
    service.post('/login', credentials)
        .then((res) => resolve(res))
        .catch((error) => reject(error.response.data));
});

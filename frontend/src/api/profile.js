import axiosInstance from './axios-instance';

const profile = {
    getMyConcert(id, filter) {
        const url = `api/v1/ticket/my-addr/${id}?page=${filter.currentPage}&keyword=${filter.keyword}&order=price&orderBy=${filter.orderBy}`;

        return axiosInstance.get(url);
    },
    postTicket(body) {
        const url = 'api/v1/ticket/';

        return axiosInstance.post(url, body);
    },
};

export default profile;

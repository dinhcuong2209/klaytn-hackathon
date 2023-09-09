import axiosInstance from './axios-instance';

const concerts = {
    getConcerts(filter) {
        const url = `api/v1/concert?page=${filter.currentPage}&keyword=${filter.keyword}&order=price&orderBy=${filter.orderBy}`;
        return axiosInstance.get(url);
    },
};

export default concerts;

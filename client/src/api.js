import request from './utils/request';

// eslint-disable-next-line
export const wine = {
    create : data => request.post('/wine', data),
    list   : data => request.post('/wines', data),
    update : (id, data) => request.patch(`/wine/${id}`, data),
    delete : (id, data) => request.delete(`/wine/${id}`, data)
};

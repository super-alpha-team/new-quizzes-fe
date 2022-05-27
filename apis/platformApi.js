import { get, post, deleteOne, serverURL } from "./common";

const platformApi = {
    getAll: function(token) {
        const url = `${serverURL}/plat/list`;
        return get(url, token);
    },
    create: function(token = "", data) {
        return post(`${serverURL}/plat/register`, data, token);
    },
    delete: function (token = "", id) {
        return deleteOne(`${serverURL}/plat/delete/${id}`, token);
    },
    edit: function(token = "", id, data) {
        return post(`${serverURL}/plat/update/${id}`, data, token);
    }
};

export default platformApi;
import { get, post, serverURL } from "./common";

export const userApi = {
    register: function (data) {
        return post(`${serverURL}/user/register`, data);
    },
    login: function (data) {
        return post(`${serverURL}/user/login`, data);
    },
    me: function (token = "") {
        return get(`${serverURL}/user/me`, token);
    }
};
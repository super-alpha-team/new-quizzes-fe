import axios from "axios";
import { LOCALHOST, SERVER_URL } from "../utils/config";

export const serverURL = `${SERVER_URL}` || `${LOCALHOST}`;

export function configToken(token) {
    return {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
}

export function get(url, token) {
    return new Promise((resolve, reject) => {
        axios
        .get(url, configToken(token))
        .then(res => {
            return resolve({data: res.data});
        })
        .catch(err => {
            return reject(err);
        });
    });
}
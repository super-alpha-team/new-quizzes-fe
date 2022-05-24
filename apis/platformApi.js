import { get, serverURL } from "./common";

const platformApi = {
    getAll: function(token) {
        const url = `${serverURL}/plat/list`;
        return get(url, token);
    }
};

export default platformApi;
import { get, serverURL } from "./common";

const syncApi = {
    syncInfo: function (token = "") {
        return get(`${serverURL}/lti/sync/info`, token);
    }
};

export default syncApi;
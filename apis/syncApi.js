import { get, serverURL } from "./common";

const syncApi = {
    syncInfo: function (token = "") {
        return get(`${serverURL}/lti/sync/info`, token);
    },
    syncLti: function (token = "") {
        return get(`${serverURL}/lti/sync/lti`, token);
    }
};

export default syncApi;
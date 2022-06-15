import { get, post, serverURL } from "./common";

const playApi = {
    join: function (token = "", quizId, data) {
        return post(`${serverURL}/lti/play/${quizId}/join`, data, token);
    },
    getResult: function (token = "", instanceId) {
        return get(`${serverURL}/lti/play/submission/${instanceId}`, token);
    }
};

export default playApi;

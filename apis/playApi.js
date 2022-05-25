import { get, post, serverURL } from "./common";

const playApi = {
    join: function (token = "", quizId, data) {
        return post(`${serverURL}/lti/play/${quizId}/join`, data, token);
    }
};

export default playApi;

import { get, post, put, serverURL } from "./common";

const quizApi = {
    getListMoodleQuiz: function (token = "") {
        return get(`${serverURL}/lti/quiz/moodle_quiz/list`, token);
    },
    getMoodleQuizAndQuestion: function (token = "", id) {
        return get(`${serverURL}/lti/quiz/moodle_quiz/get/${id}`, token);
    },
    chooseQuiz: function (token = "", data) {
        return post(`${serverURL}/lti/quiz/choose/`, data, token);
    },
    updateQuestion: function (token = "", id, data) {
        return put(`${serverURL}/lti/quiz/new_question/update/${id}`, data, token);
    },
    getQuizInstance: function (token = "", id) {
        return get(`${serverURL}/lti/quiz/new_quiz_instance/get/${id}`, token);
    },
    getQuizInstanceAndQuestion: function (token = "", id) {
        return get(`${serverURL}/lti/quiz/new_quiz_instance/get_and_question_list/${id}`, token);
    },
    updateQuizInstance: function (token = "", id, data) {
        return put(`${serverURL}/lti/quiz/new_quiz_instance/update/${id}`, data, token);
    },
    updateQuizInstanceTimeAllQuestion: function (token = "", id, data) {
        return post(`${serverURL}/lti/quiz/new_quiz_instance/set_time_all_question/${id}`, data, token);
    },
    startQuiz: function (token = "", id) {
        return post(`${serverURL}/lti/quiz/new_quiz/start/${id}`, {}, token);
    },
    listQuizInstance: function (token = "", id) {
        return get(`${serverURL}/lti/quiz/new_quiz/list_instance/${id}`, token);
    },
    createInstance: function (token = "", name, id) {
        return post(`${serverURL}/lti/quiz/new_quiz/create_instance/${id}`, {name}, token);
    },
    setNewInstanceActive: function (token = "", id) {
        return post(`${serverURL}/lti/quiz/new_quiz_instance/set_active/${id}`, {}, token);
    }

};

export default quizApi;


function save_refreshToken_localStorage(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
}
function get_refreshToken_localStorage() {
    return localStorage.getItem("refreshToken");
}
function delete_refreshToken_localStorage() {
    localStorage.removeItem("refreshToken");
}

function save_accessToken_localStorage(accessToken) {
    localStorage.setItem("accessToken", accessToken);
}
function get_accessToken_localStorage() {
    return localStorage.getItem("accessToken");
}
function delete_accessToken_localStorage() {
    localStorage.removeItem("accessToken");
}

export {
    save_refreshToken_localStorage,
    get_refreshToken_localStorage,
    delete_refreshToken_localStorage,

    save_accessToken_localStorage,
    get_accessToken_localStorage,
    delete_accessToken_localStorage,
}
// export const API_ROOT_PATH = "http://127.0.0.1:8000";
export const API_ROOT_PATH = "https://www.bronla.uz";
export const API_PATH = `${API_ROOT_PATH}/bronla/uz/data/api/`;


export const TOKEN_NAME = "app-token";

export const token = localStorage.getItem("token");

function   getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
export let headers ={
    headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
    'X-CSRFToken': csrftoken,
    'Authorization': token ?`Token ${token}`:'',
}  
};



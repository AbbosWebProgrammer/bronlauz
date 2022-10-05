// export const API_PATH = "http://127.0.0.1:8000/";
export const API_PATH = "http://207.154.206.0:8000/";

export const TOKEN_NAME = "app-token";

export const token = localStorage.getItem("token");

export let headers ={
    headers: {
    'Content-type': 'application/json',
    'Authorization': token ?`Token ${token}`:'',
}  
};



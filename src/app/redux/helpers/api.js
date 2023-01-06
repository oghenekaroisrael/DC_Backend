export const endpoints = {
    // API_HOME: "https://deliveryconnectproject-78386.uc.r.appspot.com",
    // API_HOME: "https://delivery-connect-api.herokuapp.com/api/v1",
    API_HOME2: "https://dc-backend2.uc.r.appspot.com/api/v1",
    // API_HOME2: "http://localhost:9001/api/v1",
    // API_HOME2: "https://dc-backend-3.vercel.app/api/v1",
    // API_HOME: "http://192.168.0.155:3002",
    API_HOME: "https://deliveries-360512.uc.r.appspot.com/api/v1",
    // API_HOME: "http://localhost:9000/api/v1",
}

export function getHeaders(auth = false) {
    const token = localStorage.getItem("token");
    return {
        'Authorization': auth ? `Bearer ${token}` : "",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': "*",
    };
}
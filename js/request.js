const apiUrl = 'https://backend142.onrender.com/api/';

function sendRequest(endPoint, method, data) {
    console.log('**** url',apiUrl+endPoint);
    
    let request = new XMLHttpRequest();
    console.log(apiUrl+endPoint);
    
    request.open(method, apiUrl+endPoint);
    request.responseType="json";
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data?JSON.stringify(data):data)
    return request;
}
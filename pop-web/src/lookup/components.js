// import React from 'react';

function getCookie(name) { // <- Copied from Django documention
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


function lookup(method, endpoint, callback, data){
    let jsonData;
    if(data){
        jsonData = JSON.stringify(data)
    }
    const xhr = new XMLHttpRequest()
    const url = `http://127.0.0.1:8000/api${endpoint}`
    // const responseType = "json"

    xhr.responseType = "json"
    var csrftoken = getCookie('csrftoken');    
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    if(csrftoken){
        xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        xhr.setRequestHeader("X-CSRFToken", csrftoken) // <- from the django documentation on AJAX. Could use a JWT token
    }
    xhr.onload = function(){
    callback(xhr.response, xhr.status)
    }
    xhr.onerror = function(e) {
    console.log(e)
    callback({"message": "The request encoutered an error"}, 400)
    }
    xhr.send(jsonData)
}


export function createTweet(newTweet, callback){
    lookup("POST", "/tweets/create/", callback, {content: newTweet})
}

export function loadTweets(callback){

    lookup("GET", "/tweets/", callback)
    // const xhr = new XMLHttpRequest()
    // const method = 'GET'
    // const url = 'http://127.0.0.1:8000/api/tweets/'
    // const responseType = "json"

    // xhr.responseType = responseType
    // xhr.open(method, url)
    // xhr.onload = function(){
    // callback(xhr.response, xhr.status)
    // }
    // xhr.onerror = function(e) {
    // console.log(e)
    // callback({"message": "The request encoutered an error"}, 400)
    // }
    // xhr.send()

}
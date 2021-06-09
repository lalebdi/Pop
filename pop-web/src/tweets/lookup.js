import { backendLookup } from '../lookup';


export function apiTweetCreate(newTweet, callback){
    backendLookup("POST", "/tweets/create/", callback, {content: newTweet})
}

export function apiTweetAction(tweetId, action, callback){
    const data = {id: tweetId, action: action};
    backendLookup("POST", "/tweets/action/", callback, data)
}

export function apiTweetDetail(tweetId ,callback){
    backendLookup("GET", `/tweets/${tweetId}/`, callback)
}


export function apiTweetFeed(callback, nextUrl){
    let endpoint = "/tweets/feed/"

    if(nextUrl !== null && nextUrl !== undefined){
        endpoint = nextUrl.replace("http://127.0.0.1:8000/api", "") // to be replaced in production to another endpoint
    }

    backendLookup("GET", endpoint, callback)
}


export function apiTweetList(username ,callback, nextUrl){
    let endpoint = "/tweets/"
    if(username){
        endpoint = `/tweets/?username=${username}`
    }
    if(nextUrl !== null && nextUrl !== undefined){
        endpoint = nextUrl.replace("http://127.0.0.1:8000/api", "") // to be replaced in production to another endpoint
    }

    backendLookup("GET", endpoint, callback)
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
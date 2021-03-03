import React, { useEffect, useState } from 'react';

export function loadTweets(callback){
        const xhr = new XMLHttpRequest()
        const method = 'GET'
        const url = 'http://127.0.0.1:8000/api/tweets/'
        const responseType = "json"
    
        xhr.responseType = responseType
        xhr.open(method, url)
        xhr.onload = function(){
        callback(xhr.response, xhr.status)
        }
        xhr.onerror = function(e) {
        console.log(e)
        callback({"message": "The request encoutered an error"}, 400)
        }
        xhr.send()
    
        }
    
export function TweetList(props){
        const [ tweets, setTweets ] = useState([])
    
        useEffect(() => {
        const myCallback = (response, status) =>{
            // console.log(response, status)
            if (status === 200){
            setTweets(response)
            }
        }
        loadTweets(myCallback)
        }, [])
    
        return tweets.map((item, index)=>{
        return <Tweet tweet={item} key={`${index}-{item.id}`} className='my-5 py-5 border bg-white text-dark'/>
        })
        }


export function ActionBtn(props){
    const {tweet, action} = props
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    return action.type === 'like' ? <button className={className}> { tweet.likes } Likes </button> : null
}

export function Tweet(props){
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    const action = {type: "like"}
    return <div className={className}>
            <p>{tweet.content}</p>
            <div className='btn btn-group'>
                <ActionBtn tweet={tweet} action={action}/>
            </div>
    </div>
}

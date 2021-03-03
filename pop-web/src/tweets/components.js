import React, { useEffect, useState } from 'react';
import { loadTweets } from '../lookup'


    
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

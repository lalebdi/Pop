import React, { useState, useEffect } from 'react';
import { TweetList } from './list'
import { FeedList } from './feed'
import { TweetCreate } from './create'
import { apiTweetDetail } from './lookup'
import { Tweet } from './detail'


export function FeedComponent(props){
    const [ newTweets, setNewTweets ] = useState([]) 

    const canCreate = props.canCreate === "false" ? false : true;

    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets];
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets) // setting the new state
    }

    return <div className={props.className}>
        {canCreate === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />

        }
        <FeedList newTweets={newTweets} {...props} /> 
    </div>
}


export function TweetsComponent(props){
    const [ newTweets, setNewTweets ] = useState([]) 

    const canCreate = props.canCreate === "false" ? false : true;
    // console.log(canCreate === true)
    // console.log(canCreate === false)
    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets];
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets) // setting the new state
    }

    return <div className={props.className}>
        {canCreate === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />

        }
        <TweetList newTweets={newTweets} {...props} /> 
    </div>
}
    

export function TweetDetailComponent (props) {
    const { tweetId } = props
    const [didLookup, setDidLookup] = useState(false);
    const [tweet, setTweet] = useState(null)

    const handleBackendLookup = (response, status) =>{
        if(status === 200){
            setTweet(response)
        } else {
            alert("There was an error finding your tweet 😢 ")
        }
    }
    useEffect(()=>{
        if(didLookup === false){
            apiTweetDetail(tweetId, handleBackendLookup)
            setDidLookup(true)
        }

    }, [tweetId, didLookup, setDidLookup]) 
 
    return tweet === null ? null : <Tweet tweet={tweet} className={props.className} />
}



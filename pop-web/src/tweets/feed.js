import React, { useEffect, useState } from 'react';
import { apiTweetFeed } from './lookup';
import { Tweet } from './detail';


export function FeedList(props){
    const [ tweetsInit, setTweetsInit ] = useState([]);
    const [ tweets, setTweets ] = useState([]);
    const [ nextUrl, setNextUrl ] = useState(null);
    const [ tweetsDidSet, setTweetsDidSet ] = useState(false);

    useEffect(() =>{
        const final = [...props.newTweets].concat(tweetsInit)
        if(final.length !== tweets.length){
        setTweets(final)
        }
    }, [props.newTweets , tweets, tweetsInit])

    useEffect(() => {
        if(tweetsDidSet === false){
    const handleTweetListLookup = (response, status) =>{
    
        if (status === 200){
        setNextUrl(response.next)
        setTweetsInit(response.results)
        setTweetsDidSet(true);
        }
    }
    apiTweetFeed( handleTweetListLookup) // props.username must be passed as a dependecy below to fix the useEffect hook warning
}
    }, [tweetsInit, tweetsDidSet , setTweetsDidSet, props.username])

    const handleDidRetweet = (newTweet) => {
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet);
        setTweetsInit(updateTweetsInit)

        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(tweets);
        setTweets(updateFinalTweets)
    }
    const handleLoadNext = (event) => {
        event.preventDefault()
        if(nextUrl !== null){
            const handleLoadNextResponse = (response, status) => {
                if (status === 200){
                    setNextUrl(response.next)
                    const newTweets = [...tweets].concat(response.results)
                    setTweetsInit(newTweets)
                    setTweets(newTweets)
                    // setTweetsDidSet(true);
                    } 
            }
            apiTweetFeed(handleLoadNextResponse, nextUrl)
        }
    }

    return <React.Fragment>{tweets.map((item, index)=>{
    return <Tweet tweet={item} key={`${index}-{item.id}`} didRetweet={handleDidRetweet} className='my-5 py-5 border bg-white text-dark'/>
    })}
    { nextUrl !== null && <button className="btn btn-outline-primary" onClick={handleLoadNext}>See More</button>}
    </React.Fragment>
    };
import React, { useEffect, useState } from 'react';
import { apiTweetList } from './lookup';
import { Tweet } from './detail';


export function TweetList(props){
    const [ tweetsInit, setTweetsInit ] = useState([]);
    const [ tweets, setTweets ] = useState([]);
    const [ nextUrl, setNextUrl ] = useState(null);
    const [ tweetsDidSet, setTweetsDidSet ] = useState(false);
    // console.log(props.newTweets)
    useEffect(() =>{
        const final = [...props.newTweets].concat(tweetsInit)
        if(final.length !== tweets.length){
        setTweets(final)
        }
    }, [props.newTweets , tweets, tweetsInit])

    useEffect(() => {
        if(tweetsDidSet === false){
    const handleTweetListLookup = (response, status) =>{
        // console.log(response, status)
        if (status === 200){
        setNextUrl(response.next)
        setTweetsInit(response.results)
        setTweetsDidSet(true);
        } else {
            alert("There was an error 🤦🏼‍♀️")
        }
    }
    apiTweetList(props.username, handleTweetListLookup) // props.username must be passed as a dependecy below to fix the useEffect hook warning
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

    return <React.Fragment>{tweets.map((item, index)=>{
    return <Tweet tweet={item} key={`${index}-{item.id}`} didRetweet={handleDidRetweet} className='my-5 py-5 border bg-white text-dark'/>
    })}
    { nextUrl !== null && <button className="btn btn-outline-primary">Next</button>}
    </React.Fragment>
    };
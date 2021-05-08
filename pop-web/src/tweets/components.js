import React, { useState } from 'react';
import { TweetList } from './list'
import { TweetCreate } from './create'


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
    



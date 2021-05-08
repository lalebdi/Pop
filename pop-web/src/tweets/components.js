import React, { useState } from 'react';
import { apiTweetCreate } from './lookup'
import { TweetList } from './list'


export function TweetsComponent(props){
    // console.log(props)
    // const { username } = props;
    // const { canCreate } = props;
    const textAreaRef = React.createRef()
    const [ newTweets, setNewTweets ] = useState([]) 

    const canCreate = props.canCreate === "false" ? false : true;
    // console.log(canCreate === true)
    // console.log(canCreate === false)
    const handleBackendUpdate = (response, status) => {
        // Backend API handler 
        // console.log(response, status)
        let tempNewTweets = [...newTweets];
            if(status === 201){
            tempNewTweets.unshift(response)
            setNewTweets(tempNewTweets) // setting the new state
        } else {
            console.log(response)
            alert("An error occured 😢 please try again later")
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event)
        // console.log(textAreaRef.current.value)
        const newVal = textAreaRef.current.value
        // The backend API request
        // console.log(newVal)
        // console.log('new value', newVal)
    
        apiTweetCreate(newVal, handleBackendUpdate) 
        textAreaRef.current.value = ''
    }

    return <div className={props.className}>
        {canCreate === true && <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
                <textarea className="form-control" name='tweet' required={true} ref={textAreaRef}>
                
                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
        </div>
        }
        <TweetList newTweets={newTweets} {...props} /> 
    </div>
}
    



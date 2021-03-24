import React, { useEffect, useState } from 'react';
import { loadTweets } from '../lookup'

export function TweetsComponent(props){
    const textAreaRef = React.createRef()
    const [ newTweets, setNewTweets ] = useState([]) 
    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event)
        // console.log(textAreaRef.current.value)
        const newVal = textAreaRef.current.value
        // console.log(newVal)
        let tempNewTweets = [...newTweets];
        tempNewTweets.unshift({
            content: newVal,
            likes: 0,
            id: 1234
        })
        setNewTweets(tempNewTweets) // setting the new state
        textAreaRef.current.value = ''
    }

    return <div className={props.className}>
        <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
                <textarea className="form-control" name='tweet' required={true} ref={textAreaRef}>
                
                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
        </div>
        <TweetList newTweets={newTweets}/>
    </div>
}
    
export function TweetList(props){
        const [ tweetsInit, setTweetsInit ] = useState([]);
        const [ tweets, setTweets ] = useState([]);
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
        const myCallback = (response, status) =>{
            // console.log(response, status)
            if (status === 200){
            setTweetsInit(response)
            setTweetsDidSet(true);
            }
        }
        loadTweets(myCallback)
    }
        }, [tweetsInit, tweetsDidSet , setTweetsDidSet])
    
        return tweets.map((item, index)=>{
        return <Tweet tweet={item} key={`${index}-{item.id}`} className='my-5 py-5 border bg-white text-dark'/>
        })
        }


export function ActionBtn(props){
    const {tweet, action} = props;
    const [likes, setLikes] = useState( tweet.likes ? tweet.likes : 0);
    const [userLiked, setUserLiked] = useState(tweet.userLiked === true ? true : false);
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    // const display = action.type === 'like' ? `${ tweet.likes } ${actionDisplay}` : actionDisplay
    const handleClick = (event) => {
        event.preventDefault()
        if (action.type === 'like'){ //console.log(tweet.likes+1)
            if (userLiked === true){ // the user unliked 
                setLikes(likes - 1)
                setUserLiked(false)
            } else {
                setLikes(likes + 1)
                setUserLiked(true)    
            }
        }
    }
    const display = action.type === 'like' ? `${ likes } ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}> {display} </button>
}

export function Tweet(props){
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
            <p>{tweet.id} - {tweet.content}</p>
            <div className='btn btn-group'>
                <ActionBtn tweet={tweet} action={{type: "like", display:"Likes"}}/>
                <ActionBtn tweet={tweet} action={{type: "unlike", display:"Unlike" }}/>
                <ActionBtn tweet={tweet} action={{type: "retweet", display:"Retweet" }}/>
            </div>
    </div>
}

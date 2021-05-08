
import React from 'react';
import { apiTweetAction } from './lookup'


export function ActionBtn(props){
    const {tweet, action, didPerformAction } = props;
    const likes =  tweet.likes ? tweet.likes : 0
    // const [likes, setLikes] = useState( tweet.likes ? tweet.likes : 0);
    // const [userLiked, setUserLiked] = useState(tweet.userLiked === true ? true : false);
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    // const display = action.type === 'like' ? `${ tweet.likes } ${actionDisplay}` : actionDisplay
    const handleActionBackendEvent = (response, status) =>{
        // console.log(response)
        // console.log(status)
        if ((status === 200 || status === 201) && didPerformAction ) {
            // setLikes(response.likes)
            didPerformAction(response, status)
            // setUserLiked(true)
        }
        // if (action.type === 'like'){ //console.log(tweet.likes+1)
        //     if (userLiked === true){ // the user unliked 
        //         setLikes(likes - 1)
        //         setUserLiked(false)
        //     } else {
        //         setLikes(likes + 1)
        //         setUserLiked(true)    
        //     }
        // }

    }
    const handleClick = (event) => {
        event.preventDefault()
        apiTweetAction(tweet.id, action.type, handleActionBackendEvent);
        
    }
    const display = action.type === 'like' ? `${ likes } ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}> {display} </button>
}
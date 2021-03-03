import React from 'react'


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

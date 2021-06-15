import React, { useState, useEffect } from 'react'
import { apiProfileDetail } from './lookup'
import { UserDisplay, UserPicture } from './components'


export function ProfileBadge(props){
    const { user, didFollowToggle, profileLoading } = props
    // console.log(user)
    const currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    const handleFollowToggle = (event) =>{
        // console.log(event)
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentVerb)
        }
    }
    return user ? <div>
            <UserPicture user={user} hideLink />
            <p><UserDisplay user={user} inludeFullName hideLink/></p>
            <button className='btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
        </div> : null
}

export function ProfileBadgeComponent(props) { // !parent component -> should handle the lookup
    const { username } = props

    // doing the lookup
    const [didLookup, setDidLookup] = useState(false);
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)

    const handleBackendLookup = (response, status) =>{
        if(status === 200){
            setProfile(response)
        } 
    }
    useEffect(()=>{
        if(didLookup === false){
            apiProfileDetail(username, handleBackendLookup)
            setDidLookup(true)
        }

    }, [username, didLookup, setDidLookup]) 

    const handleNewFollow = (actionVerb) => {
        console.log(actionVerb)
        setProfileLoading(true)
    }

    return didLookup === false ? "Loading... 🤓" : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} /> : null
    
}

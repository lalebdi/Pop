import React, { useState, useEffect } from 'react'
import { apiProfileDetail } from './lookup'

export function ProfileBadge(props){
    const { user } = props
    console.log(user)
    return user ? <span>{ user.first_name }</span> : null
}

export function ProfileBadgeComponent(props) {
    const { username } = props

    // doing the lookup
    const [didLookup, setDidLookup] = useState(false);
    const [profile, setProfile] = useState(null)

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
    return didLookup === false ? "Loading... 🤓" : profile ? <ProfileBadge user={profile} /> : null
    
}

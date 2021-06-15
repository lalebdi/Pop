import {backendLookup} from '../lookup'

export function apiProfileDetail(username, callback) {
    backendLookup("GET", `/profiles/${username}/`, callback)
}


export function apiProfileFollowToggle(username, action, callback) {
    const data = {action: `${action && action}`.toLowerCase()}
    backendLookup("POST", `/profiles/${username}/follow`, callback, data)
}



// template literal to avoid errors when passing null here -> it will be an empty string.
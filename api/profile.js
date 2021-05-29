import { request } from '../plugins/request';

export const getProfile = username => request({
    method: 'GET',
    url: `/api/profiles/${username}`
})

export const followUser = username => request({
    method: 'GET',
    url: `/api/profiles/${username}/follow`
})

export const unfollowUser = username => request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
})

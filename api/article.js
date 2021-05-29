import { request } from '../plugins/request';

export const getArticles = params => request({
    method: 'GET',
    url: '/api/articles',
    params
})

export const createArticle = data => request({
    method: 'POST',
    url: '/api/articles',
    data
})

export const updateUser = data => request({
    method: 'PUT',
    url: '/api/user',
    data
})

export const updateArticle = (data, slug) => request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
})

export const delArticle = slug => request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
})

export const getFeedArticles = params => request({
    method: 'GET',
    url: '/api/articles/feed',
    params
})

export const getTags = () => request({
    method: 'GET',
    url: '/api/tags'
})

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

// 添加文章评论
export const addComment = (slug, data) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}

// 删除文章评论
export const delComment = (slug, id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`
    })
}





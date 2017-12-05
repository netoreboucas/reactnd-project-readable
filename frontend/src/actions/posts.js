import * as ReadableAPI from '../utils/ReadableAPI'

export const LOADING_POSTS = 'LOADING_POSTS'
export const LOADED_POSTS = 'LOADED_POSTS'
export const SET_SORT_BY = 'SET_SORT_BY'
export const VOTE_POST = 'VOTE_POST'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const loadPosts = (category) => (dispatch) => {
  dispatch(loadingPosts())
  return ReadableAPI.getPosts(category).then((data) => {
    dispatch(loadedPosts(data))
  })
}

export const loadingPosts = () => ({
  type: LOADING_POSTS
})

export const loadedPosts = (data) => ({
  type: LOADED_POSTS,
  data
})

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  sortBy
})

export const votePost = (id, option) => (dispatch) => {
  return ReadableAPI.votePost(id, option).then((data) => {
    dispatch({
      type: VOTE_POST,
      data
    })
  })
}

export const getPost = (id) => (dispatch) => {
  return ReadableAPI.getPost(id).then((data) => {
    dispatch({
      type: GET_POST,
      data
    })
  })
}

export const addPost = (post) => (dispatch) => {
  return ReadableAPI.addPost(post).then((data) => {
    dispatch({
      type: ADD_POST,
      data
    })
    return data
  })
}

export const editPost = (id, title, body) => (dispatch) => {
  return ReadableAPI.editPost(id, title, body).then((data) => {
    dispatch({
      type: EDIT_POST,
      data
    })
  })
}

export const deletePost = (id) => (dispatch) => {
  return ReadableAPI.deletePost(id).then((data) => {
    dispatch({
      type: DELETE_POST,
      data
    })
  })
}

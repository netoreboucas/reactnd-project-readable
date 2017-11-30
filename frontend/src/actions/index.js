import * as ReadableAPI from '../utils/ReadableAPI'

export const LOADING_CATEGORIES = 'LOADING_CATEGORIES'
export const LOADED_CATEGORIES = 'LOADED_CATEGORIES'
export const SET_SELETECTED_CATEGORY = 'SET_SELETECTED_CATEGORY'

export const loadCategories = () => (dispatch) => {
  dispatch(loadingCategories())
  return ReadableAPI.getCategories().then((data) => {
    dispatch(loadedCategories(data))
  })
}

export const loadingCategories = () => ({
  type: LOADING_CATEGORIES
})

export const loadedCategories = (data) => ({
  type: LOADED_CATEGORIES,
  data
})

export const setSelectedCategory = (category) => ({
  type: SET_SELETECTED_CATEGORY,
  category
})

export const LOADING_POSTS = 'LOADING_POSTS'
export const LOADED_POSTS = 'LOADED_POSTS'
export const SET_SORT_BY = 'SET_SORT_BY'
export const VOTE_POST = 'VOTE_POST'
export const GET_POST = 'GET_POST'

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

export const LOADING_COMMENTS = 'LOADING_COMMENTS'
export const LOADED_COMMENTS = 'LOADED_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const loadComments = (postId) => (dispatch) => {
  dispatch(loadingComments(postId))
  return ReadableAPI.getComments(postId).then((data) => {
    dispatch(loadedComments(postId, data))
  })
}

export const loadingComments = (postId) => ({
  type: LOADING_COMMENTS,
  postId
})

export const loadedComments = (postId, data) => ({
  type: LOADED_COMMENTS,
  postId,
  data
})

export const voteComment = (id, option) => (dispatch) => {
  return ReadableAPI.voteComment(id, option).then((data) => {
    dispatch({
      type: VOTE_COMMENT,
      data
    })
  })
}

export const addComment = (comment) => (dispatch) => {
  return ReadableAPI.addComment(comment).then((data) => {
    dispatch({
      type: ADD_COMMENT,
      data
    })
  })
}

export const editComment = (id, body) => (dispatch) => {
  return ReadableAPI.editComment(id, body).then((data) => {
    dispatch({
      type: EDIT_COMMENT,
      data
    })
  })
}

export const deleteComment = (id) => (dispatch) => {
  return ReadableAPI.deleteComment(id).then((data) => {
    dispatch({
      type: DELETE_COMMENT,
      data
    })
  })
}

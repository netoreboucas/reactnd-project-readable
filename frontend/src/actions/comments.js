import * as ReadableAPI from '../utils/ReadableAPI'

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

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

import { combineReducers } from 'redux'

import * as ActionTypes from '../actions'

const defaultState = {
  categories: { keys: [], values: {}, loaded: false, selectedCategory: '' },
  posts: { keys: [], values: {}, loaded: false }
}

function categories (state = defaultState.categories, action) {
  switch (action.type) {
    case ActionTypes.LOADING_CATEGORIES:
      return {
        ...state,
        loaded: false
      }
    case ActionTypes.LOADED_CATEGORIES:
      return {
        ...state,
        keys: action.data.result,
        values: action.data.entities.categories,
        loaded: true
      }
    case ActionTypes.SET_SELETECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category
      }
    default:
      return state
  }
}

function posts (state = defaultState.posts, action) {
  switch (action.type) {
    case ActionTypes.LOADING_POSTS:
      return {
        ...state,
        loaded: false
      }
    case ActionTypes.LOADED_POSTS:
      return {
        ...state,
        keys: action.data.result,
        values: action.data.entities.posts,
        loaded: true
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})

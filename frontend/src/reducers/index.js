import { combineReducers } from 'redux'

import * as ActionTypes from '../actions'

const defaultState = {
  categories: { keys: [], values: {}, loaded: false, selectedCategory: '' },
  posts: { keys: [], values: {}, loaded: false, sortBy: 'voteScore', selectedPostId: null },
  comments: { keys: [], values: {}, loaded: false }
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
    case ActionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy
      }
    case ActionTypes.VOTE_POST:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.posts[action.data.result]
        }
      }
    case ActionTypes.GET_POST:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.posts[action.data.result]
        },
        selectedPostId: action.data.result
      }
    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.parentId]: {
            ...state.values[action.data.parentId],
            commentCount: state.values[action.data.parentId].commentCount + 1
          }
        }
      }
    case ActionTypes.DELETE_COMMENT:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.entities.comments[action.data.result].parentId]: {
            ...state.values[action.data.entities.comments[action.data.result].parentId],
            commentCount: state.values[action.data.entities.comments[action.data.result].parentId].commentCount - 1
          }
        }
      }
    default:
      return state
  }
}

function comments (state = defaultState.comments, action) {
  switch (action.type) {
    case ActionTypes.LOADING_COMMENTS:
      return {
        ...state,
        loaded: false
      }
    case ActionTypes.LOADED_COMMENTS:
      return {
        ...state,
        keys: action.data.result,
        values: action.data.entities.comments,
        loaded: true
      }
    case ActionTypes.VOTE_COMMENT:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.comments[action.data.result]
        }
      }
    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        keys: state.keys.concat(action.data.id),
        values: {
          ...state.values,
          [action.data.id]: action.data
        }
      }
    case ActionTypes.EDIT_COMMENT:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.id]: action.data
        }
      }
    case ActionTypes.DELETE_COMMENT:
      return {
        ...state,
        keys: state.keys.filter(id => id !== action.data.result),
        values: Object.keys(state.values).reduce((result, id) => {
          if (id !== action.data.result) {
            result[id] = state.values[id]
          }
          return result
        }, {})
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})

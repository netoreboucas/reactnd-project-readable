import * as PostActionTypes from '../actions/posts'
import * as CommentActionTypes from '../actions/comments'

const defaultState = { keys: [], values: {}, loaded: false, sortBy: 'voteScore', selectedPostId: null }

export const posts = (state = defaultState, action) => {
  switch (action.type) {
    case PostActionTypes.LOADING_POSTS:
      return {
        ...state,
        loaded: false
      }
    case PostActionTypes.LOADED_POSTS:
      return {
        ...state,
        keys: action.data.result,
        values: action.data.entities.posts,
        loaded: true
      }
    case PostActionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy
      }
    case PostActionTypes.VOTE_POST:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.posts[action.data.result]
        }
      }
    case PostActionTypes.GET_POST:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.posts[action.data.result]
        },
        selectedPostId: action.data.result
      }
    case PostActionTypes.ADD_POST:
      return {
        ...state,
        keys: state.keys.concat(action.data.result),
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.posts[action.data.result]
        }
      }
    case PostActionTypes.EDIT_POST:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.posts[action.data.result]
        }
      }
    case PostActionTypes.DELETE_POST:
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
    case CommentActionTypes.ADD_COMMENT:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.entities.comments[action.data.result].parentId]: {
            ...state.values[action.data.entities.comments[action.data.result].parentId],
            commentCount: state.values[action.data.entities.comments[action.data.result].parentId].commentCount + 1
          }
        }
      }
    case CommentActionTypes.DELETE_COMMENT:
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

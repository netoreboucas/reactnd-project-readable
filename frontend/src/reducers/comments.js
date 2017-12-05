import * as CommentActionTypes from '../actions/comments'

const defaultState = { keys: [], values: {}, loaded: false }

export const comments = (state = defaultState, action) => {
  switch (action.type) {
    case CommentActionTypes.LOADING_COMMENTS:
      return {
        ...state,
        loaded: false
      }
    case CommentActionTypes.LOADED_COMMENTS:
      return {
        ...state,
        keys: action.data.result,
        values: action.data.entities.comments,
        loaded: true
      }
    case CommentActionTypes.VOTE_COMMENT:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.comments[action.data.result]
        }
      }
    case CommentActionTypes.ADD_COMMENT:
      return {
        ...state,
        keys: state.keys.concat(action.data.result),
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.comments[action.data.result]
        }
      }
    case CommentActionTypes.EDIT_COMMENT:
      return {
        ...state,
        values: {
          ...state.values,
          [action.data.result]: action.data.entities.comments[action.data.result]
        }
      }
    case CommentActionTypes.DELETE_COMMENT:
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

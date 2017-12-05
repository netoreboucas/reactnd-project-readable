import * as CategoryActionTypes from '../actions/categories'

const defaultState = { keys: [], values: {}, loaded: false, selectedCategory: '' }

export const categories = (state = defaultState, action) => {
  switch (action.type) {
    case CategoryActionTypes.LOADING_CATEGORIES:
      return {
        ...state,
        loaded: false
      }
    case CategoryActionTypes.LOADED_CATEGORIES:
      return {
        ...state,
        keys: action.data.result,
        values: action.data.entities.categories,
        loaded: true
      }
    case CategoryActionTypes.SET_SELETECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category
      }
    default:
      return state
  }
}

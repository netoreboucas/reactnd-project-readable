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

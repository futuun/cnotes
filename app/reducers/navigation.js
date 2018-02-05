import { type } from '../actions/navigation'

const initialState = {
  onlyLiked: false,
  adding: false,
}

export default function list(state = initialState, action) {
  switch (action.type) {
    case type.toggleLiked:
      return {
        ...state,
        onlyLiked: !state.onlyLiked,
      }
    case type.toggleAdd:
      return {
        ...state,
        onlyLiked: false,
        adding: !state.adding,
      }
    default:
      return state
  }
}

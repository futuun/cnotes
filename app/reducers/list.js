import R from 'ramda'
import { REHYDRATE } from 'redux-persist'
import { type } from '../actions/list'

const initialState = {
  data: [],
  currentNote: '',
}

export default function list(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...R.pathOr({}, ['payload', 'list'], action),
      }
    }
    case type.toggleLike: {
      const index = R.findIndex(R.propEq('id', action.id), state.data)
      const adjustIndex = R.adjust(
        R.evolve({
          liked: R.not,
        }),
        index,
      )

      return {
        ...state,
        data: adjustIndex(state.data),
      }
    }
    case type.removeNote: {
      const index = R.findIndex(R.propEq('id', action.id), state.data)
      return {
        ...state,
        data: R.remove(index, 1, state.data),
      }
    }
    case type.textChange:
      return {
        ...state,
        currentNote: action.text,
      }
    case type.submitNote:
      if (/^\s*$/.test(state.currentNote)) {
        // don't add if note contains only whitespaces
        return {
          ...state,
          currentNote: '',
        }
      }

      return {
        ...state,
        currentNote: '',
        data: [
          {
            id: Date.now() / 1000,
            liked: false,
            text: state.currentNote,
          },
          ...state.data,
        ],
      }
    case type.load:
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}

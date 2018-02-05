export const type = {
  textChange: 'LIST/TEXT_CHANGED',
  submitNote: 'LIST/SUBMIT_NOTE',
  toggleLike: 'LIST/TOGGLE_LIKE',
  removeNote: 'LIST/REMOVE_NOTE',
}

export function textChange(text) {
  return {
    type: type.textChange,
    text,
  }
}

export function submitNote() {
  return {
    type: type.submitNote,
  }
}

export function toggleLike(id) {
  return {
    type: type.toggleLike,
    id,
  }
}

export function removeNote(id) {
  return {
    type: type.removeNote,
    id,
  }
}

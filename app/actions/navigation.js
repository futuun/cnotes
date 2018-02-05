export const type = {
  toggleLiked: 'NAV/TOGGLE_LIKED',
  toggleAdd: 'NAV/TOGGLE_ADD',
}

export function toggleLiked() {
  return {
    type: type.toggleLiked,
  }
}

export function toggleAdd() {
  return {
    type: type.toggleAdd,
  }
}

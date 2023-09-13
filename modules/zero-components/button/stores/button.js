// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { reactive } from '#imports'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const buttons = reactive([])

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////////////////// set
const set = (payload) => {
  const index = buttons.findIndex(button => button.id === payload.id)
  index === -1 ? buttons.push(payload) : buttons.splice(index, 1, payload)
}

// ////////////////////////////////////////////////////////////////////// remove
const remove = (id) => {
  const index = buttons.findIndex(button => button.id === id)
  if (id !== -1) {
    buttons.splice(index, 1)
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroButtonStore = defineStore('zero-button', () => ({
  // ----- state
  buttons,
  // ----- actions
  set,
  remove
}))

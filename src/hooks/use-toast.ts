import * as React from "react"

interface Toast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
}

interface State {
  toasts: Toast[]
}

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 4000

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: { type: string; toast?: Toast; toastId?: string }) {
  switch (action.type) {
    case "ADD_TOAST":
      if (action.toast) {
        memoryState = {
          ...memoryState,
          toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
        }
      }
      break
    case "REMOVE_TOAST":
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
      }
      break
  }
  listeners.forEach((listener) => listener(memoryState))
}

function genId() {
  return Math.random().toString(36).substring(2, 9)
}

interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
}

export function toast({ title, description }: ToastOptions) {
  const id = genId()

  dispatch({
    type: "ADD_TOAST",
    toast: { id, title, description },
  })

  setTimeout(() => {
    dispatch({ type: "REMOVE_TOAST", toastId: id })
  }, TOAST_REMOVE_DELAY)

  return {
    id,
    dismiss: () => dispatch({ type: "REMOVE_TOAST", toastId: id }),
  }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId: string) => dispatch({ type: "REMOVE_TOAST", toastId }),
  }
}

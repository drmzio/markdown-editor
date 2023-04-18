import { Dispatch, createContext, useContext, useReducer } from 'react'

type EditorViewType = string | 'write' | 'output'

export interface EditorState {
  view: EditorViewType
  wordCount: number
  charCount: number
}

const initialState: EditorState = {
  view: 'write',
  charCount: 0,
  wordCount: 0,
}

type Action =
  | { type: 'SET_VIEW'; payload: EditorViewType }
  | { type: 'SET_CHAR_COUNT'; payload: number }
  | { type: 'SET_WORD_COUNT'; payload: number }

function editorContextReducer(state: EditorState, action: Action) {
  switch (action.type) {
    case 'SET_VIEW':
      return {
        ...state,
        view: action.payload,
      }
    case 'SET_CHAR_COUNT':
      return {
        ...state,
        charCount: action.payload,
      }
    case 'SET_WORD_COUNT':
      return {
        ...state,
        wordCount: action.payload,
      }
    default:
      throw new Error('No action type was provided.')
  }
}

export const EditorStateContext = createContext(initialState)
export const EditorDispatchContext = createContext<Dispatch<Action>>(undefined)

export function EditorContextProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(editorContextReducer, initialState)

  return (
    <EditorDispatchContext.Provider value={dispatch}>
      <EditorStateContext.Provider value={state}>
        {children}
      </EditorStateContext.Provider>
    </EditorDispatchContext.Provider>
  )
}

export function useEditorContext(): [EditorState, Dispatch<Action>] {
  return [useContext(EditorStateContext), useContext(EditorDispatchContext)]
}

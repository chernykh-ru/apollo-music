import { createContext, FC, ReactNode, useReducer } from 'react'
import songReducer, { Action } from './reduser'
import { ISong } from './types'

interface IInitialState {
  song: ISong
  isPlaying: boolean
}

export interface ISongContext extends IInitialState {
  dispatch: React.Dispatch<Action>
}

export const SongContext = createContext<ISongContext | null>(null)

export const SongProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: IInitialState = {
    song: {
      id: 'f1977d21-d6d5-4934-b4ee-4e54ff9874cc',
      title: 'Russians',
      artist: 'Sting',
      thumbnail: 'http://img.youtube.com/vi/wHylQRVN2Qs/0.jpg',
      url: 'https://www.youtube.com/watch?v=wHylQRVN2Qs',
      duration: 284,
    },
    isPlaying: false,
  }

  const [{ song, isPlaying }, dispatch] = useReducer(songReducer, initialState)

  return (
    <SongContext.Provider value={{ song, isPlaying, dispatch }}>
      {children}
    </SongContext.Provider>
  )
}

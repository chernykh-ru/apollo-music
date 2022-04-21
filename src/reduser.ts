import { ISong } from './types'

// An enum with all the types of actions to use in our reducer
export enum ActionSong {
  PauseSong = 'PAUSE_SONG',
  PlaySong = 'PLAY_SONG',
  SetSong = 'SET_SONG',
}

export type Action = ActionPlaySong | ActionPauseSong | ActionSetSong

interface ActionPlaySong {
  type: ActionSong.PlaySong
}

interface ActionPauseSong {
  type: ActionSong.PauseSong
}

interface ActionSetSong {
  type: ActionSong.SetSong
  payload: ISong
}

export interface State {
  song: ISong
  isPlaying: boolean
}

const songReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionSong.PlaySong:
      return {
        ...state,
        isPlaying: true,
      }
    case ActionSong.PauseSong:
      return {
        ...state,
        isPlaying: false,
      }
    case ActionSong.SetSong:
      return {
        ...state,
        song: action.payload,
      }
    default: {
      return state
    }
  }
}

export default songReducer

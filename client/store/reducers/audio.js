import { UPDATE, CLEAR_AUDIO } from "../actions/audio";
import { Audio } from "expo-av";

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  interruptionModeIOS: 1,
});

const soundPlayer = new Audio.Sound();

const initialState = {
  soundPlayer,
  uri: null,
  isPlaying: false,
  isBuffering: false,
  positionMillis: 0,
  durationMillis: 0,
  started: false,
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.newData };
    case CLEAR_AUDIO:
      return initialState;
    default:
      return state;
  }
};

export default audioReducer;

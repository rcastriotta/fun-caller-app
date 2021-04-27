export const UPDATE = "UPDATE";
export const CLEAR_AUDIO = "CLEAR_AUDIO";

export const update = (newData) => {
  return (dispatch) => {
    dispatch({ type: UPDATE, newData });
  };
};

export const clearAudio = () => {
  return async (dispatch, getState) => {
    const { soundPlayer } = getState().audio;
    soundPlayer.unloadAsync();
    soundPlayer.setOnPlaybackStatusUpdate(null);
    dispatch({ type: CLEAR_AUDIO });
  };
};

export const onPlaybackStatusUpdate = ({
  isLoaded,
  positionMillis,
  durationMillis,
  didJustFinish,
}) => {
  return (dispatch, getState) => {
    const { soundPlayer, uri, started, isPlaying } = getState().audio;

    if (isPlaying) {
      dispatch(
        update({
          isBuffering: !isLoaded,
          positionMillis: positionMillis || 0,
          durationMillis: durationMillis || 0,
        })
      );
    } else {
      dispatch(
        update({
          isBuffering: !isLoaded,
        })
      );
    }

    if (isLoaded && !started) {
      if (uri) soundPlayer.playAsync();
      dispatch(
        update({
          started: true,
          isPlaying: true,
        })
      );
    }

    if (didJustFinish === true) {
      dispatch(clearAudio());
    }
  };
};

export const playPause = (newUri) => {
  return async (dispatch, getState) => {
    const { uri, soundPlayer, isBuffering, isPlaying } = getState().audio;
    if (uri === newUri) {
      if (isBuffering) {
        return;
      }
      isPlaying ? soundPlayer.pauseAsync() : soundPlayer.playAsync();
      dispatch(update({ isPlaying: !isPlaying }));
    } else {
      dispatch(clearAudio());

      dispatch(
        update({
          uri: newUri,
          isBuffering: true,
        })
      );

      await soundPlayer.loadAsync({ uri: newUri });
      await soundPlayer.setProgressUpdateIntervalAsync(1000);
      await soundPlayer.setOnPlaybackStatusUpdate((data) => {
        dispatch(onPlaybackStatusUpdate(data));
      });
    }
  };
};

export const onSeekingStart = () => {
  return (dispatch, getState) => {
    const { soundPlayer } = getState().audio;
    dispatch(update({ isPlaying: false }));
    soundPlayer.pauseAsync();
  };
};

export const onSeekingFinish = (position) => {
  return async (dispatch, getState) => {
    const { soundPlayer, durationMillis } = getState().audio;
    await soundPlayer.setPositionAsync(durationMillis * position);
    dispatch(update({ isPlaying: true }));
    soundPlayer.playAsync();
  };
};

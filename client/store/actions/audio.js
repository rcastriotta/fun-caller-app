export const UPDATE = "UPDATE";
export const CLEAR_AUDIO = "CLEAR_AUDIO";

export const update = (newData) => {
    return dispatch => {
        dispatch({ type: UPDATE, newData })
    }
}

export const clearAudio = () => {
    return async(dispatch, getState) => {
        const { soundPlayer } = getState().audio;
        soundPlayer.unloadAsync()
        soundPlayer.setOnPlaybackStatusUpdate(null);
        dispatch({ type: CLEAR_AUDIO });
    }
}

export const onPlaybackStatusUpdate = ({ isLoaded, positionMillis, durationMillis, didJustFinish }) => {
    return (dispatch, getState) => {
        let completed = '0%';
        if (positionMillis && durationMillis) {
            completed = `${((positionMillis / durationMillis) * 100).toFixed(2)}%`
        }

        const { soundPlayer, uri, started, isPlaying } = getState().audio;

        if (isPlaying) {
            dispatch(update({
                isBuffering: !isLoaded,
                completed
            }))
        } else {
            dispatch(update({
                isBuffering: !isLoaded,
            }))
        }


        if (isLoaded && !started) {
            uri ? soundPlayer.playAsync() : null;
            dispatch(update({
                started: true,
                isPlaying: true
            }))
        }

        if (didJustFinish === true) {
            dispatch(clearAudio())
        }
    }
}

export const playPause = (newUri) => {
    return async(dispatch, getState) => {
        const { uri, soundPlayer, isBuffering, isPlaying } = getState().audio;
        if (uri === newUri) {
            if (isBuffering) {
                return;
            }
            isPlaying ? soundPlayer.pauseAsync() : soundPlayer.playAsync();
            dispatch(update({ isPlaying: !isPlaying }))
        } else {
            dispatch(clearAudio())

            dispatch(update({
                uri: newUri,
                isBuffering: true,
            }))

            await soundPlayer.loadAsync({ uri: newUri });
            await soundPlayer.setOnPlaybackStatusUpdate((data) => {
                dispatch(onPlaybackStatusUpdate(data))
            })
        }
    }
}
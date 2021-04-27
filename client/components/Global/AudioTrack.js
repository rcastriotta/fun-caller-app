import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PlayButton from "./PlayButton";
import Colors from "../../constants/colors";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import * as audioActions from "../../store/actions/audio";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AudioTrack = ({ audio }) => {
  const dispatch = useDispatch();
  const {
    uri,
    isPlaying,
    isBuffering,
    positionMillis,
    durationMillis,
  } = useSelector((state) => state.audio);

  const timeFormat = (duration) => {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  const val = isNaN(positionMillis / durationMillis)
    ? 0
    : positionMillis / durationMillis;

  return (
    <View style={styles.audioPlayer}>
      <View style={styles.controls}>
        <Slider
          style={{ width: "85%", height: 30 }}
          value={val}
          minimumValue={0}
          maximumValue={1}
          disabled={isBuffering || !uri}
          onSlidingStart={() => dispatch(audioActions.onSeekingStart())}
          onSlidingComplete={(position) =>
            dispatch(audioActions.onSeekingFinish(position))
          }
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor="lightgray"
        />

        <PlayButton
          isBuffering={isBuffering}
          isPlaying={isPlaying}
          onPress={() => dispatch(audioActions.playPause(audio))}
        />
      </View>

      <Text style={styles.positionText}>
        {uri &&
          !isBuffering &&
          `${timeFormat(positionMillis)} / ${timeFormat(durationMillis)}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  audioPlayer: {
    width: "100%",
    justifyContent: "space-between",
    height: 35,
  },
  controls: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  track: {
    width: "80%",
    height: 5,
    borderRadius: 100,
    backgroundColor: "lightgray",
  },
  positionText: {
    color: "gray",
    fontFamily: "popM",
    fontSize: wp("3%"),
    marginTop: -5,
  },
  fill: {
    height: 5,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
    left: 0,
  },
});

export default AudioTrack;

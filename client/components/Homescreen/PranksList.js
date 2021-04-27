import React, { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "../../constants/colors";
import ListItem from "../Global/ListItem";
import { useDispatch, useSelector } from "react-redux";
import * as audioActions from "../../store/actions/audio";

const PranksList = (props) => {
  const dispatch = useDispatch();
  const { isPlaying, uri, curSound, isBuffering } = useSelector(
    (state) => state.audio
  );

  const prankPressHandler = (data) => {
    dispatch(audioActions.clearAudio());
    props.nav.navigate("Call", data);
  };

  const renderItem = (item) => {
    let sent;

    if (parseInt(item.sent) < 1000000) {
      sent = `${(item.sent / 1000).toFixed(1)}k sent`;
    } else {
      sent = `${(item.sent / 1000000).toFixed(1)}m sent`;
    }

    return (
      <ListItem
        onPress={() =>
          prankPressHandler({
            sent: item.sent,
            images: {
              full: item.images.full,
              square: item.images.square,
            },
            name: item.name,
            audio: item.audio,
            uri: item.uri_name,
            morePranks: props.data.pages[0].data,
          })
        }
        uri={item.images.square}
        key={item.id.toString()}
        activeOpacity={0.7}
        isPlaying={isPlaying && item.audio === uri}
        isBuffering={isBuffering && item.audio === uri}
        onAudioPress={() => dispatch(audioActions.playPause(item.audio))}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sent}>{sent}</Text>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      {props.data &&
        props.data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((data) => renderItem(data))}
          </React.Fragment>
        ))}
      {props.isLoading && (
        <ActivityIndicator
          color={Colors.primary}
          style={{ marginTop: "10%", marginBottom: "-15%" }}
        />
      )}
    </View>
  );
};

export default PranksList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    flex: 1,
    marginTop: "5%",
  },
  name: {
    fontWeight: "bold",
    fontFamily: "popB",
  },
  sent: {
    color: "gray",
    marginTop: "5%",
    fontFamily: "popM",
  },
});

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Vibration,
} from "react-native";
import { AntDesign, Foundation, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import hexToRgba from "hex-to-rgba";
import { AdMobRewarded } from "react-native-admob";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/user";

const options = [
  {
    title: "Buy Tokens",
    description: "The fastest way to get tokens and start pranking.",
    icon: <AntDesign name="creditcard" size={27} color={Colors.primary} />,
    screen: "Buy",
  },
  {
    title: "Watch Videos",
    description: "Watch videos to earn free tokens.",
    icon: <Foundation name="play-video" size={29} color={Colors.primary} />,
    screen: "Watch",
  },
  {
    title: "Earn Tokens",
    description: "Install cool apps and earn tokens.",
    icon: <MaterialIcons name="stars" size={27} color={Colors.primary} />,
    screen: "Earn",
  },
];

const Options = (props) => {
  const dispatch = useDispatch();
  const adDidFinish = useRef(false);
  const { watchedVideos, coinAmount } = useSelector((state) => state.user);
  const [adIsFetching, setAdIsFetching] = useState(false);

  const optionPressHandler = async (screen) => {
    if (screen === "Earn") {
      Alert.alert("Coming soon!");
    } else if (screen === "Buy") {
      props.navigate(screen);
    } else if (screen === "Watch") {
      if (adIsFetching) {
        return;
      }
      setAdIsFetching(true);
      adDidFinish.current = false;
      await AdMobRewarded.requestAd();
      await AdMobRewarded.showAd();
    }
  };

  const onRewardedVideoClose = () => {
    if (adDidFinish.current) {
      dispatch(userActions.updateWatched());
    }
  };

  const videoWatched = () => {
    adDidFinish.current = true;
  };

  const videoFetched = () => {
    setAdIsFetching(false);
  };

  useEffect(() => {
    (async () => {
      AdMobRewarded.addEventListener("rewarded", videoWatched);
      AdMobRewarded.addEventListener("adClosed", onRewardedVideoClose);
      AdMobRewarded.addEventListener("adOpened", videoFetched);
      await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917"); // Test ID, Replace with your-admob-unit-id
    })();

    return () => {
      AdMobRewarded.removeEventListener("rewarded", videoWatched);
      AdMobRewarded.removeEventListener("adClosed", onRewardedVideoClose);
      AdMobRewarded.removeEventListener("adOpened", videoFetched);
    };
  }, []);

  useEffect(() => {
    if (watchedVideos >= 4) {
      props.showConfetti();
      Vibration.vibrate();
      Alert.alert("You've been awarded 1 token!", "Press OK to accept", [
        {
          text: "OK",
          onPress: () => {
            dispatch(userActions.updateData({ coinAmount: coinAmount + 1 }));
            dispatch(userActions.updateWatched(true));
            props.stopConfetti();
          },
        },
      ]);
    }
  }, [watchedVideos]);

  const renderOption = (opt, i) => (
    <TouchableOpacity
      key={i}
      style={styles.option}
      activeOpacity={0.8}
      onPress={() => optionPressHandler(opt.screen)}
    >
      <View style={styles.iconContainer}>{opt.icon}</View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{opt.title}</Text>
        <Text style={styles.description}>{opt.description}</Text>
      </View>

      {i === 1 && (
        <View style={styles.videoCount}>
          {!adIsFetching ? (
            <Text style={styles.vidRewardText}>{watchedVideos}/4</Text>
          ) : (
            <ActivityIndicator color={Colors.primary} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {options.map((opt, i) => renderOption(opt, i))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 440,
  },
  option: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    marginTop: "8%",
    aspectRatio: 3.7,
    borderRadius: wp("5%"),
    padding: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: hexToRgba(Colors.primary, 0.1),
    borderRadius: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    maxWidth: "70%",
    paddingHorizontal: "5%",
    height: "100%",
  },
  title: {
    fontFamily: "popB",
    fontSize: wp("4%"),
  },
  description: {
    fontFamily: "popM",
    fontSize: wp("3%"),
    color: "gray",
    marginTop: "3%",
  },
  videoCount: {
    marginLeft: "10%",
  },
  vidRewardText: {
    fontFamily: "popB",
    fontSize: wp("4%"),
    color: Colors.primary,
  },
});

export default Options;

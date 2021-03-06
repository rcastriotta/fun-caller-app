import React, { useRef } from "react";
import { View, Text, Modal, StyleSheet, Alert } from "react-native";
import Top from "../../components/CoinsScreen/Top";
import Options from "../../components/CoinsScreen/Options";
import Bottom from "../../components/CoinsScreen/Bottom";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ConfettiCannon from "react-native-confetti-cannon";
import Confetti from "react-native-confetti";

const CoinsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const confettiRef = useRef(null);
  const confetti = useRef(null);

  const showConfetti = () => {
    if (confetti.current) confetti.current.startConfetti();
  };

  const stopConfetti = () => {
    if (confetti.current) confetti.current.stopConfetti();
  };

  return (
    <>
      <ConfettiCannon
        count={200}
        origin={{ x: -20, y: -20 }}
        fadeOut={true}
        autoStart={false}
        ref={confettiRef}
      />
      <Confetti ref={confetti} untilStopped={true} />

      <View
        style={{
          ...styles.screen,
          paddingTop: Math.max(insets.top, 16),
        }}
      >
        <Top goBack={() => navigation.goBack()} />
        <Options
          showConfetti={showConfetti}
          stopConfetti={stopConfetti}
          navigate={(screen) => navigation.navigate(screen)}
        />
        <Bottom />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    padding: "5%",
  },
});

export default CoinsScreen;

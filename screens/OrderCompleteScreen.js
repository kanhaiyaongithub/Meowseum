import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "./utils/ThemeContext";

export default function OrderCompleteScreen({ navigation }) {
  const animationRef = useRef(null);
  const { colors } = useTheme();

  useEffect(() => {
    animationRef.current?.play();

    const timeout = setTimeout(() => {
      navigation.navigate("MainTabs");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LottieView
        ref={animationRef}
        source={require("../assets/animations/order-completed.json")}
        autoPlay
        loop={false}
        style={{ width: 250, height: 250 }}
      />
      <Text style={[styles.text, { color: colors.text }]}>
        Your order has been placed!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

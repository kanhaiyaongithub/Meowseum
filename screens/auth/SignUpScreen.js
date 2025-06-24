import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../utils/ThemeContext";

export default function SignUpScreen({ navigation }) {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const handleRegister = () => {
    Alert.alert("Account Created", "Welcome to Meowseum!");
    navigation.replace("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: darkMode ? "#000" : "#e2ecf8" },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <LottieView
          ref={animationRef}
          source={require("../../assets/animations/signup-animation.json")}
          autoPlay
          loop
          style={styles.animation}
        />

        <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>
          Meowseum
        </Text>

        <View
          style={[
            styles.card,
            { backgroundColor: darkMode ? "#1a1a1a" : "#fff" },
          ]}
        >
          <Text style={[styles.header, { color: darkMode ? "#fff" : "#000" }]}>
            Create Account
          </Text>
          <Text style={[styles.subtext, { color: darkMode ? "#aaa" : "#555" }]}>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="e.g. meow_man"
            placeholderTextColor={darkMode ? "#999" : "#aaa"}
            style={[
              styles.input,
              {
                backgroundColor: darkMode ? "#2c2c2c" : "#f5f5f5",
                color: darkMode ? "#fff" : "#000",
              },
            ]}
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="e.g. meow@example.com"
            placeholderTextColor={darkMode ? "#999" : "#aaa"}
            style={[
              styles.input,
              {
                backgroundColor: darkMode ? "#2c2c2c" : "#f5f5f5",
                color: darkMode ? "#fff" : "#000",
              },
            ]}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Choose a strong password"
            secureTextEntry
            placeholderTextColor={darkMode ? "#999" : "#aaa"}
            style={[
              styles.input,
              {
                backgroundColor: darkMode ? "#2c2c2c" : "#f5f5f5",
                color: darkMode ? "#fff" : "#000",
              },
            ]}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={[styles.or, { color: darkMode ? "#aaa" : "#888" }]}>
            Or
          </Text>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/gmail-logo.png")}
                style={styles.socialIcon}
              />
              <Text style={{ color: darkMode ? "#fff" : "#000" }}>Gmail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/facebook-logo.png")}
                style={styles.socialIcon}
              />
              <Text style={{ color: darkMode ? "#fff" : "#000" }}>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 40,
  },
  animation: {
    width: 250,
    height: 250,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "85%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtext: {
    marginBottom: 15,
  },
  link: {
    color: "#4169e1",
  },
  label: {
    marginTop: 10,
    color: "#555",
  },
  input: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4169e1",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  or: {
    textAlign: "center",
    marginVertical: 10,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

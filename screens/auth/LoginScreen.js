import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../utils/ThemeContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { darkMode } = useTheme();

  const handleLogin = async () => {
    const validUsername = "meow_admin";
    const validPassword = "purrfect123";

    try {
      if (username !== validUsername || password !== validPassword) {
        throw new Error("Invalid credentials. Please try again.");
      }

      await AsyncStorage.setItem("authToken", "meowseum_static_token");
      Alert.alert("Login Successful", "Welcome to Meowseum!");
      navigation.replace("MainTabs");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#000" : "#e2ecf8" },
      ]}
    >
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>
        Meowseum
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: darkMode ? "#1c1c1e" : "#fff" },
        ]}
      >
        <Text style={[styles.welcome, { color: darkMode ? "#fff" : "#000" }]}>
          Welcome Back!
        </Text>

        <Text style={[styles.subtext, { color: darkMode ? "#ccc" : "#555" }]}>
          Don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Signup")}
          >
            Register
          </Text>
        </Text>

        <Text style={[styles.label, { color: darkMode ? "#ccc" : "#555" }]}>
          Username
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkMode ? "#333" : "#f9f9f9",
              color: darkMode ? "#fff" : "#000",
            },
          ]}
          placeholder="e.g. meow_admin"
          placeholderTextColor={darkMode ? "#888" : "#aaa"}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={[styles.label, { color: darkMode ? "#ccc" : "#555" }]}>
          Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkMode ? "#333" : "#f9f9f9",
              color: darkMode ? "#fff" : "#000",
            },
          ]}
          placeholder="Enter your password"
          placeholderTextColor={darkMode ? "#888" : "#aaa"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={[styles.forgot, { color: "#f77" }]}>Forgot password?</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
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
            <Text style={styles.socialText}>Gmail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/facebook-logo.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtext: {
    marginBottom: 15,
  },
  link: {
    color: "#4169e1",
    fontWeight: "600",
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  forgot: {
    textAlign: "right",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4169e1",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  or: {
    textAlign: "center",
    marginVertical: 12,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "45%",
    justifyContent: "center",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialText: {
    fontWeight: "500",
  },
});

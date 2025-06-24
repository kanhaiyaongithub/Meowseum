import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./utils/ThemeContext";

export default function ProfileScreen({ navigation }) {
  const { isDark, toggleTheme, colors } = useTheme();
  const [notifications, setNotifications] = React.useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    Alert.alert("Logged Out", "You have been logged out.");
    navigation.replace("Login");
  };

  const openSupport = () => {
    Linking.openURL("mailto:support@meowseum.com");
  };

  const rateApp = () => {
    Linking.openURL("https://example.com/meowseum-playstore");
  };

  const aboutMeowseum = () => {
    Alert.alert("About Meowseum", "Version 1.0\nCrafted for cat lovers 🐱");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
        <Image
          source={require("../assets/profile-placeholder.png")}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: colors.text }]}>
          Kanhaiya Choudhary
        </Text>
        <Text style={[styles.email, { color: isDark ? "#aaa" : "#666" }]}>
          iamkanhaiyachoudhary@gmail.com
        </Text>
      </View>

      <View style={styles.settingsSection}>
        <SettingRow
          icon="moon"
          label="Dark Mode"
          control={<Switch value={isDark} onValueChange={toggleTheme} />}
          colors={colors}
        />
        <SettingRow
          icon="notifications"
          label="Notifications"
          control={
            <Switch value={notifications} onValueChange={setNotifications} />
          }
          colors={colors}
        />
        <SettingRow
          icon="star"
          label="Rate Meowseum"
          onPress={rateApp}
          colors={colors}
        />
        <SettingRow
          icon="help-circle"
          label="Contact Support"
          onPress={openSupport}
          colors={colors}
        />
        <SettingRow
          icon="information-circle"
          label="About Meowseum"
          onPress={aboutMeowseum}
          colors={colors}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingRow({ icon, label, control, onPress, colors }) {
  const content = (
    <View style={[styles.row, { backgroundColor: colors.card }]}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color={colors.text} />
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </View>
      {control ?? (
        <Ionicons name="chevron-forward" size={18} color={colors.text} />
      )}
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
  ) : (
    content
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  profileCard: {
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 30,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    marginTop: 4,
  },
  settingsSection: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#4169e1",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 30,
    alignSelf: "center",
    paddingHorizontal: 30,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

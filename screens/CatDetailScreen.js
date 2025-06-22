// screens/CatDetailScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "./utils/ThemeContext";

export default function CatDetailScreen({ route, navigation }) {
  const { cat } = route.params;
  const { darkMode } = useTheme();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, []);

  const checkIfSaved = async () => {
    const saved = await AsyncStorage.getItem("savedCats");
    const savedCats = saved ? JSON.parse(saved) : [];
    const found = savedCats.find((c) => c.id === cat.id);
    setIsSaved(!!found);
  };

  const toggleSaveCat = async () => {
    const saved = await AsyncStorage.getItem("savedCats");
    const savedCats = saved ? JSON.parse(saved) : [];

    if (isSaved) {
      const updated = savedCats.filter((c) => c.id !== cat.id);
      await AsyncStorage.setItem("savedCats", JSON.stringify(updated));
      setIsSaved(false);
      Alert.alert("Removed", "Cat removed from your saved list.");
    } else {
      const newCat = {
        id: cat.id,
        name: cat.name,
        temperament: cat.temperament,
        origin: cat.origin,
        life_span: cat.life_span,
        image: cat.image?.url || "https://placekitten.com/300/300",
      };
      const updated = [...savedCats, newCat];
      await AsyncStorage.setItem("savedCats", JSON.stringify(updated));
      setIsSaved(true);
      Alert.alert("Saved", "Cat added to your saved list.");
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#000" : "#f8f9fc" },
      ]}
    >
      <Image
        source={{ uri: cat.image?.url || "https://placekitten.com/400/400" }}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: darkMode ? "#fff" : "#000" }]}>
          {cat.name}
        </Text>

        <View style={styles.tags}>
          <Text style={[styles.tag, { backgroundColor: "#fbd38d" }]}>
            {cat.life_span} years
          </Text>
          <Text style={[styles.tag, { backgroundColor: "#90cdf4" }]}>
            {cat.origin}
          </Text>
          <Text
            style={[
              styles.tag,
              { backgroundColor: darkMode ? "#4a5568" : "#e2e8f0" },
            ]}
          >
            {cat.temperament?.split(",")[0] || "Calm"}
          </Text>
        </View>

        <Text
          style={[styles.description, { color: darkMode ? "#ccc" : "#555" }]}
        >
          {cat.description ||
            "This cat breed is known for its charm and elegance. They're affectionate, curious, and love cozy naps in sunbeams."}
        </Text>

        <TouchableOpacity
          onPress={toggleSaveCat}
          style={[
            styles.button,
            {
              backgroundColor: isSaved ? "#e53e3e" : "#4169e1",
            },
          ]}
        >
          <Text style={styles.buttonText}>
            {isSaved ? "Remove from Saved" : "Save This Cat"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    color: "#000",
    fontSize: 13,
    fontWeight: "600",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

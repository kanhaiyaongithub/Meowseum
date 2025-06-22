import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "./utils/ThemeContext";

export default function SavedCatsScreen() {
  const [savedCats, setSavedCats] = useState([]);
  const isFocused = useIsFocused();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (isFocused) loadSavedCats();
  }, [isFocused]);

  const loadSavedCats = async () => {
    try {
      const data = await AsyncStorage.getItem("savedCats");
      const parsed = data ? JSON.parse(data) : [];
      setSavedCats(parsed);
    } catch (e) {
      console.error("Failed to load saved cats", e);
    }
  };

  const removeCat = async (id) => {
    try {
      const filtered = savedCats.filter((cat) => cat.id !== id);
      await AsyncStorage.setItem("savedCats", JSON.stringify(filtered));
      setSavedCats(filtered);
      Alert.alert("Removed", "Cat removed from saved list.");
    } catch (e) {
      console.error("Error removing cat", e);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[styles.card, { backgroundColor: darkMode ? "#1c1c1e" : "#fff" }]}
    >
      <Image
        source={{ uri: item.image || "https://placekitten.com/300/300" }}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: darkMode ? "#fff" : "#000" }]}>
          {item.name}
        </Text>
        <Text
          style={[styles.detail, { color: darkMode ? "#aaa" : "#555" }]}
          numberOfLines={2}
        >
          {item.temperament}
        </Text>
        <Text style={[styles.detail, { color: darkMode ? "#aaa" : "#555" }]}>
          Origin: {item.origin}
        </Text>
        <Text style={[styles.detail, { color: darkMode ? "#aaa" : "#555" }]}>
          Life Span: {item.life_span} years
        </Text>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeCat(item.id)}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#000" : "#e2ecf8" },
      ]}
    >
      <Text style={[styles.header, { color: darkMode ? "#fff" : "#000" }]}>
        Saved Cats
      </Text>
      <FlatList
        data={savedCats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: darkMode ? "#888" : "#666" }]}>
            No cats saved yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    marginTop: 2,
  },
  removeButton: {
    marginTop: 8,
  },
  removeText: {
    color: "red",
    fontWeight: "bold",
  },
  empty: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 16,
  },
});

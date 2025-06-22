import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import catApi from "./utils/catApi";
import { useTheme } from "./utils/ThemeContext";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 40) / 2;

export default function HomeScreen({ navigation }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  const fetchCats = async () => {
    try {
      const res = await catApi.get("/breeds");
      setCats(res.data);
    } catch (err) {
      console.error("Error fetching cats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const renderCat = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, darkMode && styles.cardDark]}
      onPress={() => navigation.navigate("CatDetail", { cat: item })}
    >
      <Image
        source={{
          uri: item.image?.url || "https://placekitten.com/300/300",
        }}
        style={styles.image}
      />
      <Text
        style={[styles.name, { color: darkMode ? "#eee" : "#333" }]}
        numberOfLines={2}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#000" : "#f8f9fc" },
      ]}
    >
      <Text style={[styles.header, { color: darkMode ? "#fff" : "#333" }]}>
        Discover Cat Breeds
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4169e1" />
      ) : (
        <FlatList
          data={cats}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={renderCat}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    margin: 6,
    width: itemWidth,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    paddingBottom: 10,
    alignItems: "center",
  },
  cardDark: {
    backgroundColor: "#1c1c1e",
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
});

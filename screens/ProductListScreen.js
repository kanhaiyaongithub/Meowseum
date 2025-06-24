import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./utils/ThemeContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const products = [
  {
    id: "1",
    name: "Whiskas Cat Food",
    price: 499,
    image: require("../assets/products/whiskas.png"),
  },
  {
    id: "2",
    name: "Temptations Treats",
    price: 299,
    image: require("../assets/products/temptations.png"),
  },
  {
    id: "3",
    name: "Smart Ball Toy",
    price: 899,
    image: require("../assets/products/smart-ball.png"),
  },
  {
    id: "4",
    name: "Cat Shampoo",
    price: 349,
    image: require("../assets/products/shampoo.png"),
  },
  {
    id: "5",
    name: "Mice Toys",
    price: 199,
    image: require("../assets/products/mice-toys.png"),
  },
  {
    id: "6",
    name: "Feather Wand",
    price: 149,
    image: require("../assets/products/feather-wand.png"),
  },
  {
    id: "7",
    name: "Drools Cat Food",
    price: 599,
    image: require("../assets/products/drools.png"),
  },
  {
    id: "8",
    name: "Cozy Cat Bed",
    price: 999,
    image: require("../assets/products/cat-bed.png"),
  },
];

export default function ProductListScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="cart-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.price, { color: colors.text }]}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Shop Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
  },
});

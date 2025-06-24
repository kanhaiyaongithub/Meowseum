import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "./context/CartContext";
import { useTheme } from "./utils/ThemeContext";

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const { addToCart } = useCart();
  const { isDark, colors } = useTheme();

  useEffect(() => {
    const randomStock = Math.floor(Math.random() * 10) + 1;
    setStock(randomStock);
  }, []);

  useEffect(() => {
    setIsOutOfStock(quantity > stock);
  }, [quantity, stock]);

  const handleAddToCart = () => {
    if (isOutOfStock) {
      Alert.alert(
        "Out of Stock",
        "You have selected more than the available quantity."
      );
      return;
    }
    addToCart({ ...product, quantity });
    Alert.alert("Added to Cart", `${product.name} x${quantity} added.`);
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Image source={product.image} style={styles.image} />
      <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>
      <Text style={[styles.price]}>₹{product.price}</Text>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Product Details
      </Text>
      <Text style={[styles.description, { color: isDark ? "#aaa" : "#555" }]}>
        {product.description ||
          "This is a high-quality cat product designed to provide comfort, entertainment, or nutrition for your feline friend."}
      </Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.qtyButton} onPress={decreaseQty}>
          <Ionicons name="remove-circle-outline" size={28} color="#4169e1" />
        </TouchableOpacity>
        <Text style={[styles.quantity, { color: colors.text }]}>
          {quantity}
        </Text>
        <TouchableOpacity style={styles.qtyButton} onPress={increaseQty}>
          <Ionicons name="add-circle-outline" size={28} color="#4169e1" />
        </TouchableOpacity>
      </View>

      {isOutOfStock && <Text style={styles.outOfStockText}>Out of Stock</Text>}

      <TouchableOpacity
        style={[styles.button, isOutOfStock && { backgroundColor: "gray" }]}
        onPress={handleAddToCart}
        disabled={isOutOfStock}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4169e1",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  qtyButton: {
    padding: 10,
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: "500",
  },
  outOfStockText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4169e1",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

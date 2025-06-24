import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "./context/CartContext";
import { useTheme } from "./utils/ThemeContext";

export default function CartScreen({ navigation }) {
  const { cartItems, setCartItems } = useCart();
  const { colors, isDark } = useTheme();

  const updateQuantity = (itemId, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const formatCurrency = (amount) =>
    "₹" +
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const renderItem = ({ item }) => (
    <View style={[styles.itemRow, { backgroundColor: colors.card }]}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: colors.text }]}>
          {item.name}
        </Text>
        <View style={styles.qtyControls}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <Ionicons name="remove-circle-outline" size={24} color="#4169e1" />
          </TouchableOpacity>
          <Text style={[styles.qty, { color: colors.text }]}>
            {item.quantity}
          </Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Ionicons name="add-circle-outline" size={24} color="#4169e1" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.itemPrice]}>
          {formatCurrency(item.price * item.quantity)}
        </Text>
      </View>
    </View>
  );

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: colors.text }]}>My Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 220 }}
      />

      {cartItems.length > 0 && (
        <View
          style={[
            styles.orderSummary,
            { backgroundColor: isDark ? "#1c1c1e" : "#f0f4ff" },
          ]}
        >
          <Text style={[styles.summaryTitle, { color: colors.text }]}>
            Order Summary
          </Text>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Subtotal</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {formatCurrency(subtotal)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Shipping</Text>
            <Text style={[styles.value, { color: colors.text }]}>Free</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>
              GST (10%)
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {formatCurrency(tax)}
            </Text>
          </View>
          <View
            style={[
              styles.separator,
              { backgroundColor: isDark ? "#444" : "#ccc" },
            ]}
          />
          <View style={styles.row}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { color: colors.text }]}>
              {formatCurrency(total)}
            </Text>
          </View>
        </View>
      )}

      {cartItems.length > 0 && (
        <View
          style={[
            styles.checkoutBar,
            {
              backgroundColor: colors.background,
              borderColor: isDark ? "#333" : "#ddd",
            },
          ]}
        >
          <Text style={[styles.total, { color: colors.text }]}>
            Total: {formatCurrency(total)}
          </Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate("ShippingAddress")}
          >
            <Text style={styles.checkoutText}>Check Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  itemRow: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  itemPrice: {
    fontWeight: "bold",
    color: "#4169e1",
  },
  orderSummary: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#4169e1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

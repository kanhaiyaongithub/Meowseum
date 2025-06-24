import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "./utils/ThemeContext";

export default function PaymentScreen({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { isDark, colors } = useTheme();

  const paymentMethods = [
    {
      id: "phonepe",
      name: "PhonePe",
      icon: require("../assets/payment-logos/phonepe.png"),
    },
    {
      id: "gpay",
      name: "GPay",
      icon: require("../assets/payment-logos/gpay.png"),
    },
    {
      id: "netbanking",
      name: "NetBanking",
      icon: require("../assets/payment-logos/net-banking.png"),
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: require("../assets/payment-logos/card.png"),
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: require("../assets/payment-logos/cod.png"),
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Stepper */}
      <View style={styles.stepper}>
        <View style={styles.step}>
          <Ionicons name="location-outline" size={24} color="gray" />
          <Text style={styles.inactiveStepText}>Shipping</Text>
        </View>
        <View style={styles.step}>
          <Ionicons name="card-outline" size={24} color="#4169e1" />
          <Text style={styles.activeStepText}>Payment</Text>
        </View>
        <View style={styles.step}>
          <MaterialIcons name="receipt-long" size={24} color="gray" />
          <Text style={styles.inactiveStepText}>Review</Text>
        </View>
      </View>

      <Text style={[styles.heading, { color: colors.text }]}>
        Select Payment Method
      </Text>

      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.methodCard,
            {
              backgroundColor:
                selectedMethod === method.id
                  ? isDark
                    ? "#2a3b61"
                    : "#eef2ff"
                  : colors.card,
              borderColor: selectedMethod === method.id ? "#4169e1" : "#ccc",
            },
          ]}
          onPress={() => setSelectedMethod(method.id)}
        >
          <View style={styles.iconLabel}>
            <Image source={method.icon} style={styles.icon} />
            <Text style={[styles.methodText, { color: colors.text }]}>
              {method.name}
            </Text>
          </View>
          <Ionicons
            name={
              selectedMethod === method.id
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={22}
            color={selectedMethod === method.id ? "#4169e1" : "#999"}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.continueButton, { opacity: selectedMethod ? 1 : 0.6 }]}
        onPress={() => navigation.navigate("OrderComplete")}
        disabled={!selectedMethod}
      >
        <Text style={styles.continueText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  stepper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  step: {
    alignItems: "center",
  },
  activeStepText: {
    color: "#4169e1",
    fontSize: 12,
    marginTop: 4,
  },
  inactiveStepText: {
    color: "gray",
    fontSize: 12,
    marginTop: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
  },
  iconLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 12,
  },
  methodText: {
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#4169e1",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

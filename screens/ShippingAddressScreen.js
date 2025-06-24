import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "./utils/ThemeContext";

export default function ShippingAddressScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const { colors, isDark } = useTheme();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    navigation.navigate("PaymentScreen");
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Stepper Icons */}
      <View style={styles.stepper}>
        <View style={styles.step}>
          <Ionicons name="location-outline" size={24} color="#4169e1" />
          <Text style={styles.activeStepText}>Shipping</Text>
        </View>
        <View style={styles.step}>
          <Ionicons name="card-outline" size={24} color="gray" />
          <Text style={styles.inactiveStepText}>Payment</Text>
        </View>
        <View style={styles.step}>
          <MaterialIcons name="receipt-long" size={24} color="gray" />
          <Text style={styles.inactiveStepText}>Review</Text>
        </View>
      </View>

      <Text style={[styles.heading, { color: colors.text }]}>
        Shipping Address
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#2c2c2e" : "#f9f9f9",
            color: colors.text,
            borderColor: isDark ? "#555" : "#ddd",
          },
        ]}
        placeholder="House No."
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        value={form.houseNo}
        onChangeText={(text) => handleChange("houseNo", text)}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#2c2c2e" : "#f9f9f9",
            color: colors.text,
            borderColor: isDark ? "#555" : "#ddd",
          },
        ]}
        placeholder="Street Name"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        value={form.street}
        onChangeText={(text) => handleChange("street", text)}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#2c2c2e" : "#f9f9f9",
            color: colors.text,
            borderColor: isDark ? "#555" : "#ddd",
          },
        ]}
        placeholder="City"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        value={form.city}
        onChangeText={(text) => handleChange("city", text)}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#2c2c2e" : "#f9f9f9",
            color: colors.text,
            borderColor: isDark ? "#555" : "#ddd",
          },
        ]}
        placeholder="State"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        value={form.state}
        onChangeText={(text) => handleChange("state", text)}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#2c2c2e" : "#f9f9f9",
            color: colors.text,
            borderColor: isDark ? "#555" : "#ddd",
          },
        ]}
        placeholder="Postal Code"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        keyboardType="numeric"
        value={form.postalCode}
        onChangeText={(text) => handleChange("postalCode", text)}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#2c2c2e" : "#f9f9f9",
            color: colors.text,
            borderColor: isDark ? "#555" : "#ddd",
          },
        ]}
        placeholder="Country"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        value={form.country}
        onChangeText={(text) => handleChange("country", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue to Payment</Text>
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4169e1",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

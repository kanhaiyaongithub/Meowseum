import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import SplashScreen from "./screens/sp/SplashScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import CatDetailScreen from "./screens/CatDetailScreen";
import SavedCatsScreen from "./screens/SavedCatsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderCompleteScreen from "./screens/OrderCompleteScreen";

import { ThemeProvider, useTheme } from "./screens/utils/ThemeContext";
import { CartProvider } from "./screens/context/CartContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Shop") {
            return (
              <MaterialCommunityIcons
                name="shopping"
                color={color}
                size={size}
              />
            );
          }

          let iconName = "home-outline";
          if (route.name === "Saved") iconName = "bookmark-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Home") iconName = "home-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4169e1",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, height: 60 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedCatsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Shop"
        component={ProductListScreen}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function MainApp() {
  const { isDark } = useTheme();
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="CatDetail" component={CatDetailScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="ShippingAddress"
          component={ShippingAddressScreen}
        />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </CartProvider>
  );
}

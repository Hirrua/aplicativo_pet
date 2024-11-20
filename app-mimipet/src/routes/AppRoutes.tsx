import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimalDetailsScreen from "../screens/AnimalDetailScreen";
import IconMaterial from "react-native-vector-icons/MaterialIcons"

export type RootStackParmsList = {
  Home: undefined
  Animal: {id: number}
}

const Stack = createStackNavigator<RootStackParmsList>()
const StackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Animal"
        component={AnimalDetailsScreen}
        options={{ headerShown: false }}
      />
  </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator<RootStackParmsList>()
const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={StackRoutes}
        options={{ tabBarLabelStyle: { color: "#FE6863" },
          tabBarIcon: ({ size = 10 }) => (<Icon name="home" color={"#FE6863"} size={size}/>) }}
      />
    </Tab.Navigator>
  )
}

export { StackRoutes, TabRoutes }
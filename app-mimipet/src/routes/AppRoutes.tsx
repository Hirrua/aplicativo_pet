import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screens/HomeScreen"
import Icon from "react-native-vector-icons/FontAwesome"
import AnimalDetailsScreen from "../screens/AnimalDetailScreen"
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import VacinasDetailSceen from "../screens/VacinasDetailScreen"
import ListarAnimaisScreen from "../screens/ListarAnimaisScreen"
import { Text } from "react-native" // Importação para o Text

export type RootStackParmsList = {
  Home: undefined
  Animais: undefined
  Animal: { animal_id: number }
  Vacinas: { vacina_id: number }
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
      <Stack.Screen
        name="Vacinas"
        component={VacinasDetailSceen}
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
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size = 10 }) => {
            const iconColor = focused ? "#FE6863" : "#C3E036"
            return <Icon name="home" color={iconColor} size={size} />
          },
          tabBarLabel: ({ focused }) => {
            const labelColor = focused ? "#FE6863" : "#C3E036"
            return (
              <Text style={{ color: labelColor }}>
                Home
              </Text>
            )
          },
        })}
      />
      <Tab.Screen
        name="Animais"
        component={ListarAnimaisScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size = 10 }) => {
            const iconColor = focused ? "#FE6863" : "#C3E036"
            return <IconMaterial name="pets" color={iconColor} size={size} />
          },
          tabBarLabel: ({ focused }) => {
            const labelColor = focused ? "#FE6863" : "#C3E036"
            return (
              <Text style={{ color: labelColor }}>
                Animais
              </Text>
            )
          },
        })}
      />
    </Tab.Navigator>
  )
}

export { StackRoutes, TabRoutes }

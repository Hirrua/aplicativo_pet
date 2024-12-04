import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screens/HomeScreen"
import Icon from "react-native-vector-icons/FontAwesome"
import AnimalDetailsScreen from "../screens/AnimalDetailScreen"
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import VacinasDetailSceen from "../screens/VacinasDetailScreen"
import ListarAnimaisScreen from "../screens/ListarAnimaisScreen"
import EditarInfoScreen from "../screens/EditarInfoScreen"
import CadastrarAnimalScreen from "../screens/CadastrarAnimal"
import { Text } from "react-native"

export type RootStackParmsList = {
  Home: undefined
  Animais: undefined
  Animal: { animal_id: number }
  Vacinas: { vacina_id: number }
  EditarInfo: { edit_animal_id: number }
  Cadastrar: undefined
}

const HomeStack = createStackNavigator<RootStackParmsList>()
const HomeStackRoutes = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Animal"
        component={AnimalDetailsScreen} 
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Vacinas"
        component={VacinasDetailSceen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  )
}

const AnimaisStack = createStackNavigator<RootStackParmsList>()
const AnimaisStackNavigator = () => (
  <AnimaisStack.Navigator>
    <AnimaisStack.Screen 
      name="Animais"
      component={ListarAnimaisScreen}
      options={{ headerShown: false }}
    />
    <AnimaisStack.Screen 
        name="Cadastrar"
        component={CadastrarAnimalScreen}
        options={{ headerShown: false }}
    />
    <AnimaisStack.Screen
      name="EditarInfo"
      component={EditarInfoScreen}
      options={{ headerShown: false }} 
    />
  </AnimaisStack.Navigator>
)

const Tab = createBottomTabNavigator<RootStackParmsList>()
const TabRoutes = () => {
  return (
    <Tab.Navigator
    screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackRoutes}
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
        component={AnimaisStackNavigator}
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

export { HomeStackRoutes, TabRoutes }

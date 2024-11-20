import React, { useEffect, useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import AnimalCard from "../components/AnimalCard";
import Header from "../components/Header";
import api from "../services/api";
import { RootStackParmsList } from "../routes/AppRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = StackNavigationProp<RootStackParmsList, "Home">;

type Animais = {
  id: number
  nome: string
}

const HomeScreen = () => {
  const [animais, setAnimais] = useState<Animais[]>([])
  const navigation = useNavigation<NavigationProp>();

  const fetchAnimais = async () => {
    try {
      const response = await api.get("/animais")
      setAnimais(response.data)
    } catch (error) {
      console.error("Erro ao buscar animal:", error)
    }
  }

  useEffect(
    React.useCallback(() => {
      fetchAnimais()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={animais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AnimalCard
            nome={item.nome}
            onPress={() => navigation.navigate("Animal", { id: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 20
  }
})

export default HomeScreen
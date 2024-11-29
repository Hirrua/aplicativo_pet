import React, { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import api from "../services/api"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParmsList } from "../routes/AppRoutes"
import Header from "../components/Header"
import BotaoInfos from "../components/BotaoInfo"

interface Animal {
  id: number
  nome: string
  especie: string
  raca: string
  sexo: string
}

type Props = StackScreenProps<RootStackParmsList, "Animais">

const ListarAnimaisScreen = ({ navigation }: Props) => {
  const [animais, setAnimais] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  console.log("tela animal")
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get("/animais")
        setAnimais(response.data)
      } catch (error) {
        console.error("Erro ao buscar lista de animais:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimals()
  }, [])

  const handleAnimalDetails = (animalId: number) => {
    navigation.navigate("Animal", { animal_id: animalId })
  }

  const handleEditAnimal = (animalId: number) => {
    console.log("Editar Animal com ID:", animalId)
    navigation.navigate("Animal", { animal_id: animalId }) 
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    )
  }

  return (
    <>
      <Header />
      <FlatList
        data={animais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleAnimalDetails(item.id)}
            >
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardText}>Espécie: {item.especie}</Text>
              <Text style={styles.cardText}>Raça: {item.raca}</Text>
              <Text style={styles.cardText}>Sexo: {item.sexo}</Text>
            </TouchableOpacity>

            <BotaoInfos
              onPress={() => handleEditAnimal(item.id)}
              label="Editar informação"
            />

          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
  listContainer: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  }
})

export default ListarAnimaisScreen

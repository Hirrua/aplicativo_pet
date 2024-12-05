import React, { useState } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import api from "../services/api"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParmsList } from "../routes/AppRoutes"
import Header from "../components/Header"
import { useFocusEffect } from "@react-navigation/native"

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

  useFocusEffect(
    React.useCallback(() => {
      fetchAnimals()
    }, [])
  )

  const handleAnimalDetails = (animalId: number) => {
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
              <Text style={styles.cardText}>
              Sexo: {item.sexo === "F" ? "Fêmea" : item.sexo === "M" ? "Macho" : item.sexo}
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("EditarInfo", { edit_animal_id: item.id })
              }
            >
              <Text style={styles.buttonText}>Editar Informações</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => navigation.navigate("Cadastrar")}
          >
            <Text style={styles.buttonText}>Adicionar Animal</Text>
          </TouchableOpacity>
        }
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
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FE6863",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonAdd: {
    marginTop: 20,
    backgroundColor: "#C3E036",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
})

export default ListarAnimaisScreen

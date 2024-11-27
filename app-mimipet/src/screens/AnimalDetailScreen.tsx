import React, { useState, useEffect } from "react"
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native"
import api from "../services/api" // API configurada para consumo
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParmsList } from "../routes/AppRoutes"
import Header from "../components/Header"

// Tipos baseados no JSON de exemplo que você enviou
interface Dado {
  id: number // ID da aplicação
  animal: {
    id: number
    nome: string
    especie: string
    raca: string
    sexo: string
  }
  vacina: {
    id: number
    nome: string
    fabricante: string
    doses: number
    anotacoes: string
  }
  data_aplicacao: string
  quantidade_aplicada: number
  responsavel_aplicacao: string
}

interface Animal {
  id: number
  nome: string
  especie: string
  raca: string
  sexo: string
}

type Props = StackScreenProps<RootStackParmsList, "Animal">

const AnimalDetailsScreen = ({ route }: Props) => {
  const { animal_id } = route.params
  const [dados, setDados] = useState<Dado[]>([])
  const [animal, setAnimal] = useState<Animal>()

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const response = await api.get(`/aplicar/animal/${animal_id}`)

        if (response.data.length > 0) {
          setAnimal(response.data[0].animal)
        }
        setDados(response.data)
      } catch (error) {
        console.error("Erro ao buscar detalhes do animal:", error)
      }
    }

    fetchAnimalDetails()
  }, [animal_id])

  return (
    <>
      <Header />
      {animal && (
        <View>
          <Text style={styles.animalName}>{animal.nome}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Espécie: {animal.especie}</Text>
            <Text style={styles.detailText}>Raça: {animal.raca}</Text>
            <Text style={styles.detailText}>Sexo: {animal.sexo}</Text>
          </View>
        </View>
      )}

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vacina: {item.vacina.nome}</Text>
            <Text style={styles.cardText}>Data de Aplicação: {item.data_aplicacao}</Text>
            <Text style={styles.cardText}>Quantidade Aplicada: {item.quantidade_aplicada}</Text>
            <Text style={styles.cardText}>Responsável: {item.responsavel_aplicacao}</Text>
          </View>
        )}
      />
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  animalName: {
    fontSize: 20,
    fontWeight: "500",
    color: "#555",
    textAlign: "center",
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 6,
  },
  aplicacaoContainer: {
    marginBottom: 20,
  },
  aplicacaoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
})

export default AnimalDetailsScreen

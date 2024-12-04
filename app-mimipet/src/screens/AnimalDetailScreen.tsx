import React, { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import api from "../services/api"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParmsList } from "../routes/AppRoutes"
import Header from "../components/Header"

interface Animal {
  id: number
  nome: string
  especie: string
  raca: string
  sexo: string
  cor: string
  criado_em: string
  atualizado_em: string
  foto_animal?: string
}

interface Vacina {
  id: number
  nome: string
  fabricante: string
  doses: number
  anotacoes: string
  data_aplicacao: string
  quantidade_aplicada: number
  responsavel_aplicacao: string
}

type Props = StackScreenProps<RootStackParmsList, "Animal">

const AnimalDetailsScreen = ({ route }: Props) => {
  const { animal_id } = route.params
  const [animal, setAnimal] = useState<Animal | null>(null)
  const [vacinas, setVacinas] = useState<Vacina[]>([])
  const [loading, setLoading] = useState(true)
  const [vacinaError, setVacinaError] = useState(false)

  const fetchAnimalDetails = async () => {
    try {
      const animalResponse = await api.get(`/animais/${animal_id}`)
      setAnimal(animalResponse.data)

      try {
        const vacinasResponse = await api.get(`/aplicar/animal/${animal_id}`)
        setVacinas(vacinasResponse.data)
      } catch (vacinaErr) {
        const error = vacinaErr as { response?: { status: number } }
        if (error.response?.status === 404) {
          setVacinaError(true)
        } else {
          console.error("Erro ao buscar vacinas aplicadas:", vacinaErr)
        }
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do animal:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnimalDetails()
  }, [animal_id])

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
      {animal && (
        <View style={styles.animalContainer}>
          {animal.foto_animal && (
            <Image
              source={{ uri: animal.foto_animal }}
              style={styles.animalImage}
              resizeMode="cover"
            />
          )}
          <Text style={styles.animalName}>{animal.nome}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Espécie: {animal.especie}</Text>
            <Text style={styles.detailText}>Raça: {animal.raca}</Text>
            <Text style={styles.detailText}>Sexo: {animal.sexo}</Text>
            <Text style={styles.detailText}>Cor: {animal.cor}</Text>
            <Text style={styles.detailText}>
              Criado em: {new Date(animal.criado_em).toLocaleDateString()}
            </Text>
          </View>
        </View>
      )}

      <FlatList
        data={vacinas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vacina: {item.nome}</Text>
            <Text style={styles.cardText}>Fabricante: {item.fabricante}</Text>
            <Text style={styles.cardText}>Doses: {item.doses}</Text>
            <Text style={styles.cardText}>Data de Aplicação: {item.data_aplicacao}</Text>
            <Text style={styles.cardText}>
              Responsável: {item.responsavel_aplicacao}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          vacinaError ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>Nenhuma vacina aplicada.</Text>
            </View>
          ) : null
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
  animalContainer: {
    padding: 16,
    alignItems: "center",
  },
  animalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  animalName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FE6863",
    textAlign: "center",
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    width: "100%",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 6,
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
  noDataContainer: {
    padding: 20,
    alignItems: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#999",
  },
})

export default AnimalDetailsScreen

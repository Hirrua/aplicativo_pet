import React, { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import api from "../services/api"
import Header from "../components/Header"

interface Vacina {
  id: number
  nome: string
}

interface Aplicacao {
  id: number
  data_aplicacao: string
  quantidade_aplicada: number
  responsavel_aplicacao: string
  vacina: Vacina
  animal: Animal
}

interface Animal {
  id: number
  nome: string
  idade: number
  especie: string
  raca: string
  sexo: string
}

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [aplicacoesRecentes, setAplicacoesRecentes] = useState<Aplicacao[]>([])
  const [animais, setAnimais] = useState<Animal[]>([])

  useEffect(() => {
    const fetchAplicacoesRecentes = async () => {
      try {
        const response = await api.get("/aplicar/recentes")
        setAplicacoesRecentes(response.data)
      } catch (error) {
        console.error("Erro ao buscar aplicações recentes", error)
      }
    }

    const fetchAnimais = async () => {
      try {
        const response = await api.get("/animais")
        setAnimais(response.data)
      } catch (error) {
        console.error("Erro ao buscar animais", error)
      }
    }

    fetchAplicacoesRecentes()
    fetchAnimais()
  }, [])

  return (

    <View style={styles.container}>
      <Header />
      <FlatList
        data={animais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardText}>Espécie: {item.especie}</Text>
            <Text style={styles.cardText}>Raça: {item.raca}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Animal', { animal_id: item.id })}
            >
              <Text style={styles.buttonText}>Ver Detalhes do Animal</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <FlatList
        data={aplicacoesRecentes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vacina: {item.vacina.nome}</Text>
            <Text style={styles.cardText}>Animal: {item.animal.nome}</Text>
            <Text style={styles.cardText}>Data de Aplicação: {item.data_aplicacao}</Text>
            <Text style={styles.cardText}>Quantidade Aplicada: {item.quantidade_aplicada}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Vacinas", { vacina_id: item.vacina.id })}
              >
              <Text style={styles.buttonText}>Ver Detalhes do Animal</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FE6863",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
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
})

export default HomeScreen
import React, { useState } from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native"
import api from "../services/api"
import Header from "../components/Header"
import { useFocusEffect } from "@react-navigation/native"

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
  foto_animal?: string
}

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [aplicacoesRecentes, setAplicacoesRecentes] = useState<Aplicacao[]>([])
  const [animais, setAnimais] = useState<Animal[]>([])

  const fetchAplicacoesRecentes = async () => {
    try {
      const response = await api.get("/aplicar/recentes")
      if (response.data && response.data.length > 0) {
        setAplicacoesRecentes(response.data)
      } else {
        setAplicacoesRecentes([])
      }
    } catch {
      setAplicacoesRecentes([])
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

  useFocusEffect(
    React.useCallback(() => {
      fetchAnimais()
      fetchAplicacoesRecentes()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Header />
      {animais.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>
            Não há animais cadastrados. Cadastre o primeiro agora!
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("CadastroAnimal")}
          >
            <Text style={styles.addButtonText}>Cadastrar Animal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={animais}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  {item.foto_animal ? (
                    <Image
                      source={{ uri: item.foto_animal }}
                      style={styles.animalImage}
                    />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Text style={styles.placeholderText}>Sem Foto</Text>
                    </View>
                  )}
                  <View style={styles.infoContainer}>
                    <Text style={styles.cardTitle}>{item.nome}</Text>
                    <Text style={styles.cardText}>Espécie: {item.especie}</Text>
                    <Text style={styles.cardText}>Raça: {item.raca}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("Animal", { animal_id: item.id })
                  }
                >
                  <Text style={styles.buttonText}>Ver Detalhes do Animal</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {aplicacoesRecentes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyMessage}>
                Não há aplicações recentes registradas.
              </Text>
            </View>
          ) : (
            <FlatList
              data={aplicacoesRecentes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>
                    Vacina: {item.vacina.nome}
                  </Text>
                  <Text style={styles.cardText}>
                    Animal: {item.animal.nome}
                  </Text>
                  <Text style={styles.cardText}>
                    Data de Aplicação: {item.data_aplicacao}
                  </Text>
                  <Text style={styles.cardText}>
                    Quantidade Aplicada: {item.quantidade_aplicada}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("Vacinas", { vacina_id: item.id })
                    }
                  >
                    <Text style={styles.buttonText}>Ver Detalhes da Vacina</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </>
      )}
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
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  animalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FE6863",
    marginRight: 15,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  placeholderText: {
    fontSize: 10,
    color: "#666",
  },
  infoContainer: {
    flex: 1,
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#FE6863",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
})

export default HomeScreen

import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParmsList } from "../routes/AppRoutes"
import api from "../services/api"
import Header from "../components/Header"

type Vacina = {
  id: number
  nome: string
  fabricante: string
  anotacoes: string
  doses: number
}

type Props = StackScreenProps<RootStackParmsList, "Vacinas">

const VacinasDetailScreen = ({ route }: Props) => {
  const { vacina_id } = route.params
  const [vacina, setVacina] = useState<Vacina>()

  const fetchVacinaDetail = async (id: number) => {
    try {
      const response = await api.get(`/aplicar/${id}`)
      setVacina(response.data.vacina)
    } catch (error) {
      console.error("Erro ao buscar detalhes da vacina:", error)
    }
  }

  useEffect(() => {
    if (vacina_id) {
      fetchVacinaDetail(vacina_id)
    }
  }, [vacina_id])

  return (
    <View style={styles.screenContainer}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        {vacina ? (
          <View style={styles.card}>
            <Text style={styles.infoText}>
              Vacina: <Text style={styles.infoValue}>{vacina.nome}</Text>
            </Text>
            <Text style={styles.infoText}>
              Fabricante: <Text style={styles.infoValue}>{vacina.fabricante}</Text>
            </Text>
            <Text style={styles.infoText}>
              Doses: <Text style={styles.infoValue}>{vacina.doses}</Text>
            </Text>
            {vacina.anotacoes && (
              <Text style={styles.infoText}>
                Anotações: <Text style={styles.infoValue}>{vacina.anotacoes}</Text>
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.loadingText}>Nenhuma vacina encontrada.</Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  infoValue: {
    fontWeight: "bold",
    color: "#FE6863",
  },
  loadingText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
})

export default VacinasDetailScreen

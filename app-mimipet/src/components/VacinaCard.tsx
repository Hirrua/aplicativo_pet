import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  nome: string
  anotacoes: string
  data_aplicacao: string
  onPress: () => void
}

const VacinaCard = ({ nome, anotacoes, data_aplicacao, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.text}>{nome}</Text>
      <Text style={styles.text}>{anotacoes}</Text>
      <Text style={styles.text}>{data_aplicacao}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: "#FE6863"
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "#C3E036",
    fontWeight: "bold",
  },
})

export default VacinaCard
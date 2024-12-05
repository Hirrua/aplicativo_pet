import React from "react"
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native"
import api from "../services/api"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParmsList } from "../routes/AppRoutes"
import { useNavigation } from "@react-navigation/native"

type PropsDelete = {
  id: number
}

type EditarScreenProp = StackNavigationProp<RootStackParmsList, "EditarInfo">

const DeleteAnimalButton = ({ id }: PropsDelete) => {
  const navigation = useNavigation<EditarScreenProp>()
  const handleDelete = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja deletar este animal?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await api.delete(`/animais/${id}`)
              if (response.status === 200) {
                Alert.alert("Animal deletado com sucesso!")
                navigation.navigate("Home")
              }
            } catch (error) {
              console.error("Erro ao tentar deletar o animal:", error)
            }
          },
        },
      ]
    )
  }

  return (
    <TouchableOpacity onPress={handleDelete} style={styles.button}>
      <Text style={styles.buttonText}>Deletar Animal</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default DeleteAnimalButton

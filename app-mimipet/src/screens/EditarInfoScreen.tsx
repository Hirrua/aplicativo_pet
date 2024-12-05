import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { RootStackParmsList } from "../routes/AppRoutes"
import Header from "../components/Header"
import { useNavigation } from "@react-navigation/native"
import api from "../services/api"
import DeleteAnimalButton from "../components/BotaoDelete"
import { Picker } from "@react-native-picker/picker"

interface Animal {
  id: number
  nome: string
  especie: string
  raca: string
  sexo: string
  criado_em?: string
  cor?: string
  memorial?: boolean
  atualizado_em?: string
  id_tutor?: string
  aplicacoesVacinas?: string
  foto_animal?: string
}

type Props = StackScreenProps<RootStackParmsList, "EditarInfo">
type HomeScreenProp = StackNavigationProp<RootStackParmsList, "Home">

const EditarInfoScreen = ({ route }: Props) => {
  const { edit_animal_id } = route.params
  const [animalData, setAnimalData] = useState<Animal>({
    id: edit_animal_id,
    nome: "",
    especie: "",
    raca: "",
    sexo: "",
    cor: "",
    memorial: false,
    foto_animal: "",
  })

  const navigation = useNavigation<HomeScreenProp>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const response = await api.get(`/animais/${edit_animal_id}`)
        setAnimalData(response.data)
      } catch (error) {
        console.error("Erro ao buscar detalhes do animal:", error)
        Alert.alert("Erro ao carregar os dados do animal.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnimalDetails()
  }, [edit_animal_id])

  const handleInputChange = (name: string, value: string | boolean) => {
    setAnimalData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      alert("Permission to access gallery was denied.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setAnimalData((prevData) => ({
        ...prevData,
        foto_animal: result.assets[0].uri,
      }))
    }
  }

  const convertImageToBase64 = async (uri: string) => {
    return await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
  }

  const handleUpdateAnimal = async () => {
    try {
      const { id, criado_em, atualizado_em, id_tutor, aplicacoesVacinas, ...animalDataToUpdate } = animalData
      const response = await api.put(`/animais/${edit_animal_id}`, animalDataToUpdate)

      if (response.status === 200) {
        Alert.alert("Animal atualizado com sucesso!")
        navigation.navigate("Home")
      }
    } catch (error) {
      console.error("Erro ao atualizar animal:", error)
      Alert.alert("Erro ao atualizar animal.")
    }
  }

  const handleSaveChanges = async () => {
    if (animalData.foto_animal) {
      const base64Image = await convertImageToBase64(animalData.foto_animal)
      setAnimalData((prevData) => ({
        ...prevData,
        foto_animal: `data:image/jpegbase64,${base64Image}`,
      }))
    }
    handleUpdateAnimal()
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
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePickImage}>
          {animalData.foto_animal ? (
            <Image
              source={{ uri: animalData.foto_animal }}
              style={styles.image}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text>Selecionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={animalData.nome}
          onChangeText={(value) => handleInputChange("nome", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Espécie"
          value={animalData.especie}
          onChangeText={(value) => handleInputChange("especie", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Raça"
          value={animalData.raca}
          onChangeText={(value) => handleInputChange("raca", value)}
        />
        <Text style={styles.label}>Sexo</Text>
        <Picker
          selectedValue={animalData.sexo}
          onValueChange={(itemValue) => handleInputChange("sexo", itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecione o sexo" value="" />
          <Picker.Item label="Fêmea" value="F" />
          <Picker.Item label="Macho" value="M" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Cor"
          value={animalData.cor}
          onChangeText={(value) => handleInputChange("cor", value)}
        />
        <View style={styles.memorialContainer}>
          <Text>Memorial:</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => handleInputChange("memorial", !animalData.memorial)}
          >
            <Text style={styles.toggleButtonText}>
              {animalData.memorial ? "Sim" : "Não"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <DeleteAnimalButton id={animalData.id}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#C3E036",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  memorialContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#000",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FE6863",
    alignSelf: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
})

export default EditarInfoScreen

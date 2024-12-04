import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import api from "../services/api"
import Header from "../components/Header"

const CadastrarAnimalScreen = ({ navigation }: { navigation: any }) => {
  const [nome, setNome] = useState("")
  const [raca, setRaca] = useState("")
  const [especie, setEspecie] = useState("")
  const [cor, setCor] = useState("")
  const [sexo, setSexo] = useState("")
  const [memorial, setMemorial] = useState(false)
  const [fotoAnimal, setFotoAnimal] = useState<string | null>(null)

  const idTutor = 1 // Substitua pelo ID do tutor obtido após implementar o login.

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      alert("Permissão para acessar a galeria foi negada.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setFotoAnimal(result.assets[0].uri)
    }
  }

  const handleSubmit = async () => {
    if (!nome || !raca || !especie || !cor || !sexo) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.")
      return
    }

    const animalData = {
      nome,
      raca,
      especie,
      cor,
      sexo,
      memorial,
      id_tutor: idTutor,
      foto_animal: fotoAnimal,
    }

    try {
      await api.post("/animais", animalData)
      Alert.alert("Sucesso", "Animal cadastrado com sucesso!")
      navigation.goBack()
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error)
      Alert.alert("Erro", "Não foi possível cadastrar o animal.")
    }
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Animal</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Raça"
          value={raca}
          onChangeText={setRaca}
        />
        <TextInput
          style={styles.input}
          placeholder="Espécie"
          value={especie}
          onChangeText={setEspecie}
        />
        <TextInput
          style={styles.input}
          placeholder="Cor"
          value={cor}
          onChangeText={setCor}
        />
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={sexo}
          onChangeText={setSexo}
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setMemorial(!memorial)}
          >
            <View
              style={[
                styles.checkboxInner,
                memorial && styles.checkboxSelected,
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Memorial</Text>
        </View>
        <View style={styles.imageContainer}>
          {fotoAnimal && (
            <Image source={{ uri: fotoAnimal }} style={styles.image} />
          )}
          <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
            <Text style={styles.imageButtonText}>Selecionar Foto</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Cadastrar Animal</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FE6863",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: "transparent",
  },
  checkboxSelected: {
    backgroundColor: "#FE6863",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FE6863",
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#FE6863",
    padding: 10,
    borderRadius: 5,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#C3E036",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
})

export default CadastrarAnimalScreen

import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import api from "../services/api"
import Header from "../components/Header"
import { Picker } from "@react-native-picker/picker"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParmsList } from "../routes/AppRoutes"

type HomeScreenProp = StackNavigationProp<RootStackParmsList, "Home">

const CadastrarAnimalScreen = ({ navigation }: { navigation: any }) => {
  const [nome, setNome] = useState("")
  const [raca, setRaca] = useState("")
  const [especie, setEspecie] = useState("")
  const [cor, setCor] = useState("")
  const [sexo, setSexo] = useState("")
  const [memorial, setMemorial] = useState(false)
  const [fotoAnimal, setFotoAnimal] = useState<string | null>(null)

  const idTutor = 1

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
      navigation.navigate("Home")
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error)
      Alert.alert("Erro", "Não foi possível cadastrar o animal.")
    }
  }

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
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
        
        <Text style={styles.label}>Sexo</Text>
        <Picker
          selectedValue={sexo}
          onValueChange={(itemValue) => setSexo(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecione o sexo" value="" />
          <Picker.Item label="Fêmea" value="F" />
          <Picker.Item label="Macho" value="M" />
        </Picker>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setMemorial(!memorial)}
          >
            <View
              style={[styles.checkboxInner, memorial && styles.checkboxSelected]}
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
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
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
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
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

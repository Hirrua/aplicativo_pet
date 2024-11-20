import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParmsList } from "../routes/AppRoutes";
import api from "../services/api";
import Icon from "react-native-vector-icons/FontAwesome"; // Usando FontAwesome para o ícone
import Header from "../components/Header"; // Cabeçalho importado

// Tipo Animal
type Animal = {
  id: number;
  nome: string;
  sexo: string;
  raca: string;
  cor: string;
  especie: string;
  memorial: boolean;
};

// Tipagem do Props para acessar o 'route' da navegação
type Props = StackScreenProps<RootStackParmsList, "Animal">;

const AnimalDetailsScreen = ({ route }: Props) => {
  const { id } = route.params;
  const [animal, setAnimal] = useState<Animal | null>(null);

  const fetchAnimal = async (id: number) => {
    try {
      const response = await api.get(`/animais/${id}`);
      setAnimal(response.data);
    } catch (error) {
      console.error("Erro ao buscar animal:", error);
    }
  };

  useEffect(() => {
    fetchAnimal(id);
  }, [id]);

  return (
    <View style={styles.screenContainer}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.animalInfo}>
          {animal ? (
            <>
              {/* Se o memorial for "Sim", exibe o ícone de memorial */}
              {animal.memorial && (
                <View style={styles.memorialContainer}>
                  <Icon name="grav" size={30} color="#FE6863" />
                  <Text style={styles.memorialText}>Este animal está em memorial</Text>
                </View>
              )}

              <Text style={styles.infoText}>
                Nome: <Text style={styles.infoValue}>{animal.nome}</Text>
              </Text>
              <Text style={styles.infoText}>
              Sexo: <Text style={styles.infoValue}>{animal.sexo === "F" ? "Fêmea" : animal.sexo === "M" ? "Macho" : "Indefinido"}</Text>
              </Text>
              <Text style={styles.infoText}>
                Raça: <Text style={styles.infoValue}>{animal.raca}</Text>
              </Text>
              <Text style={styles.infoText}>
                Cor: <Text style={styles.infoValue}>{animal.cor}</Text>
              </Text>
              <Text style={styles.infoText}>
                Espécie: <Text style={styles.infoValue}>{animal.especie}</Text>
              </Text>
              <Text style={styles.infoText}>
                Memorial: <Text style={styles.infoValue}>{animal.memorial ? "Sim" : "Não"}</Text>
              </Text>
            </>
          ) : (
            <Text style={styles.loadingText}>Carregando...</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  animalInfo: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  infoValue: {
    fontWeight: "bold",
    color: "#FE6863",
  },
  memorialContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FE6863",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  memorialText: {
    fontSize: 16,
    color: "#FFF",
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
});

export default AnimalDetailsScreen;

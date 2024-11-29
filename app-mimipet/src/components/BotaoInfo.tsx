import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

interface BotaoInfosProps {
  onPress: () => void
  label: string
}

const BotaoInfos = ({ onPress, label }: BotaoInfosProps) => {
  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}>
      <Text style={styles.editButtonText}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: "#FE6863",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default BotaoInfos

import React, { createContext, useContext, useEffect, useState } from "react"
import { View } from "react-native"
import { CustomImage } from "../components/CustomImage"
import { StyleSheet } from "react-native"

type InitialContextProps = {
    children: JSX.Element | JSX.Element[]
}

type InitialContext = {}

const InitialContext = createContext<InitialContext | null>(null)

export default function InitialContextComponent({ children }: InitialContextProps) {
    const [ loading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
      const interval = setInterval(() => {
        setLoading(false)
      }, 2000)
      return () => {
        clearInterval(interval)
      }
    }, [])

    if (loading) {
        return (
            <View style={styles.logo}>
              <CustomImage.Local filePathByRequire={ require("../../public/logo.png")} height={200} width={200} />
            </View>
        )
    }

    return (
        <InitialContext.Provider value={{}}>
          { children }
        </InitialContext.Provider>
    )
}

export function InitialContextProvider() {
    const context = useContext(InitialContext)
    if (!context) throw new Error("InitialContext chamado fora do provider.")
    return context
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
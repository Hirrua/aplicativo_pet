import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStackRoutes, TabRoutes } from "./src/routes/AppRoutes";
import InitialContextComponent from "./src/context/InitialContext";

const App = () => {
  return (
    <NavigationContainer>
      <InitialContextComponent>
        <TabRoutes />
      </InitialContextComponent>
    </NavigationContainer>
  )
}

export default App
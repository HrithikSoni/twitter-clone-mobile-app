import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Root from "./Root";

const App = () => {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
};

export default App;

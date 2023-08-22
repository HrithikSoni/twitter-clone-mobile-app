import React from "react";
import { AuthProvider } from "./app/context/AuthContext";
import Root from "./Root";

const App = () => {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
};

export default App;

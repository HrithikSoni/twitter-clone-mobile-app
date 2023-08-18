import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Text>SettingsScreen</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

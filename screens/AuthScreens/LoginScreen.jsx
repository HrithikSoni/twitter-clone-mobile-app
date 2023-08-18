import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import screenNames from "../../constants/screenNames";
import { AuthContext } from "../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { login, error, isLoading } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LoginScreen</Text>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="gray"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      <Button onPress={() => login(email, password)} title="Login" />
      <Button
        onPress={() => navigation.navigate(screenNames.REGISTER_SCREEN)}
        title="Go To Register"
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {isLoading && <ActivityIndicator size="large" color="gray" />}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

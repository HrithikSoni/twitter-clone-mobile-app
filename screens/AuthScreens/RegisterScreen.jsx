import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import screenNames from "../../constants/screenNames";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>RegisterScreen</Text>
      <TextInput
        placeholder="Name"
        onChangeText={setName}
        value={name}
        placeholderTextColor="gray"
      />
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
      <Button
        onPress={() => navigation.navigate(screenNames.LOGIN_SCREEN)}
        title="Go To Login"
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});

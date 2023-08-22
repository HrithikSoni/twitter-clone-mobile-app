import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={require("../../../assets/twitter-logo.png")}
          />
        </View>
        <View>
          {error && (
            <Text style={{ color: "red", marginTop: 10, alignSelf: "center" }}>
              {error}
            </Text>
          )}
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="gray"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.inputBox, styles.mt4]}
          />
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="gray"
            secureTextEntry={true}
            style={[styles.inputBox, styles.mt4]}
          />
        </View>
        <View style={styles.mt4}>
          <TouchableOpacity
            onPress={() => login(email, password)}
            style={styles.loginButton}
          >
            {isLoading && (
              <ActivityIndicator
                size="small"
                color="gray"
                style={{ marginRight: 10 }}
              />
            )}
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.registerText, styles.mt4]}>
              Didn't have the account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.REGISTER_SCREEN)}
            >
              <Text style={[styles.registerLinkText, styles.mt4]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d9bf1",
  },
  logo: {
    height: 70,
    width: 70,
  },
  inputBox: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: 230,
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#0084b3",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  loginText: {
    color: "white",
  },
  registerText: {
    marginRight: 5,
  },
  registerLinkText: {
    color: "white",
    textDecorationLine: "underline",
  },
  mt4: {
    marginTop: 16,
  },
  mt5: {
    marginTop: 22,
  },
});

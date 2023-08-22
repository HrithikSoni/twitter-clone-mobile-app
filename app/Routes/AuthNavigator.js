import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import screenNames from "../constants/screenNames";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import RegisterScreen from "../screens/AuthScreens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={screenNames.REGISTER_SCREEN}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

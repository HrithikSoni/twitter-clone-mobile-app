import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "./screens/SettingsScreen";
import screenNames from "./constants/screenNames";
import { HomeStackNavigator } from "./Routes/HomeStackNavigator";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { AuthNavigator } from "./Routes/AuthNavigator";
import * as SecureStore from "expo-secure-store";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    SecureStore.getItemAsync("user")
      .then((userString) => {
        if (userString) {
          setUser(null);
          // setUser(Json.parse(userString))
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <>
      {user ? (
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home1" component={HomeStackNavigator} />
            <Drawer.Screen
              name={screenNames.SETTINGS_SCREEN}
              component={SettingsScreen}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}
    </>
  );
}

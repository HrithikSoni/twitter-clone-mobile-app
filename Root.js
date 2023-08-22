import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "./app/screens/SettingsScreen";
import screenNames from "./app/constants/screenNames";
import { HomeStackNavigator } from "./app/Routes/HomeStackNavigator";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./app/context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { AuthNavigator } from "./app/Routes/AuthNavigator";
import * as SecureStore from "expo-secure-store";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    SecureStore.getItemAsync("user")
      .then((userString) => {
        if (userString) {
          setUser(JSON.parse(userString));
          console.log(user.id);
        }
        setIsLoading(false);
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
            <Drawer.Screen
              name="Twitter Clone"
              component={HomeStackNavigator}
            />
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

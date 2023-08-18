import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "./screens/SettingsScreen";
import screenNames from "./constants/screenNames";
import { HomeStackNavigator } from "./Routes/HomeStackNavigator";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home1" component={HomeStackNavigator} />
        <Drawer.Screen
          name={screenNames.SETTINGS_SCREEN}
          component={SettingsScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

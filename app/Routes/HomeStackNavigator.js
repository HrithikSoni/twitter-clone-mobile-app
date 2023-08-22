import { createStackNavigator } from "@react-navigation/stack";
import TweetScreen from "../screens/TweetScreen";
import NewTweetScreens from "../screens/NewTweetScreeen";
import ProfileScreen from "../screens/ProfileScreen";
import "react-native-gesture-handler";
import { BottomTabNavigator } from "./BottomTabNavigator";
import screenNames from "../constants/screenNames";

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={BottomTabNavigator} />
      <Stack.Screen
        name={screenNames.SINGLE_TWEET_SCREEN}
        component={TweetScreen}
      />
      <Stack.Screen
        name={screenNames.NEW_TWEET_SCREEN}
        component={NewTweetScreens}
      />
      <Stack.Screen
        name={screenNames.PROFILE_SCREEN}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

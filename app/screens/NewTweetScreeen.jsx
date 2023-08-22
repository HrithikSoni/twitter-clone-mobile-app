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
import axiosConfig from "../helpers/axiosConfig";
import screenNames from "../constants/screenNames";
import { AuthContext } from "../context/AuthContext";

export default function NewTweetScreeen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");

  const { user } = useContext(AuthContext);

  function sendTweet() {
    if (tweet.length === 0) {
      Alert.alert("Please enter a tweet");
      return;
    }

    setIsLoading(true);
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;
    axiosConfig
      .post(`/tweets`, {
        body: tweet,
      })
      .then((response) => {
        console.log(screenNames.HOME_SCREEN);
        navigation.navigate(screenNames.HOME_SCREEN, {
          newTweetAdded: response.data,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoading(false);
      });
  }

  function goToProfile(userId) {
    navigation.navigate(screenNames.PROFILE_SCREEN, {
      userId,
    });
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.flexRow, styles.spaceBetween, styles.tweetButtonCon]}
      >
        <Text
          style={[
            tweet.length > 250 ? styles.textRed : styles.textGray,
            styles.p5,
          ]}
        >
          Characters Left: {300 - tweet.length}
        </Text>
        <View style={styles.flexRow}>
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="gray"
              style={{ marginRight: 7 }}
            />
          )}
          <TouchableOpacity
            style={styles.tweetButton}
            onPress={() => sendTweet()}
            disabled={isLoading}
          >
            <Text style={[styles.tweetButtonText]}>Tweet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.p5, styles.flexRow]}>
        <TouchableOpacity onPress={() => goToProfile(user.id)}>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={tweet}
          onChangeText={setTweet}
          placeholder="What's Happening?"
          multiline
          placeholderTextColor="gray"
          maxLength={300}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flexRow: {
    flexDirection: "row",
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#e7e5eb",
  },
  textGray: {
    color: "gray",
  },
  textRed: {
    color: "red",
  },
  p5: {
    padding: 5,
  },
  tweetButtonCon: {
    margin: 5,
  },
  tweetButtonConText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tweetButton: {
    backgroundColor: "#1d9bf1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  tweetButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textInput: {
    flex: 1,
    padding: 10,
    lineHeight: 30,
    fontSize: 20,
  },
});

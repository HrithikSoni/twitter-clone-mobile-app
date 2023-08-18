import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import axiosConfig from "../helpers/axiosConfig";
import screenNames from "../constants/screenNames";

export default function NewTweetScreeen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  function sendTweet() {
    axiosConfig
      .post(`/tweets`, {
        body: { input, user_id: 1 },
      })
      .then((response) => {
        setIsLoading(true);
        navigation.navigate(screenNames.PROFILE_SCREEN);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoading(false);
      });
  }

  function goToProfile() {
    navigation.navigate("Profile");
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.flexRow, styles.spaceBetween, styles.tweetButtonCon]}
      >
        <Text
          style={[
            input.length > 250 ? styles.textRed : styles.textGray,
            styles.p5,
          ]}
        >
          Characters Left: {300 - input.length}
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
          >
            <Text style={[styles.tweetButtonText]}>Tweet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.p5, styles.flexRow]}>
        <TouchableOpacity onPress={() => goToProfile()}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
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

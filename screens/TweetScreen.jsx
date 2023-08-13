import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import axiosConfig from "../helpers/axiosConfig";
import screenNames from "../constants/screenNames";
import { format } from "date-fns";

const TweetScreen = ({ route, navigation }) => {
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTweets();
  }, []);

  function getTweets() {
    axiosConfig
      .get(`/tweets/${route.params.tweetId}`)
      .then((response) => {
        setTweet(response.data);
        console.log(tweet);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  const goToProfile = () => {
    navigation.navigate(screenNames.PROFILE_SCREEN);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <>
          <View style={[styles.flexRow, styles.spaceBetween]}>
            <View style={styles.flexRow}>
              <TouchableOpacity onPress={() => goToProfile}>
                <Image
                  style={styles.avatar}
                  source={{ uri: tweet.user.avatar }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tweetHandle}
                onPress={() => goToProfile}
              >
                <Text style={styles.tweetName}>{tweet.user.name}</Text>
                <Text style={styles.textGray}>@{tweet.user.username}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Entypo
                name="dots-three-vertical"
                size={24}
                color="black"
                style={styles.textGray}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.tweetContentCon, styles.bottomBorder]}>
            <Text style={styles.tweetContent}>{tweet.body}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                {format(new Date(tweet.created_at), "h:mm a")}
              </Text>
              <Text style={styles.infoText}>
                {format(new Date(tweet.created_at), "d MMM yy")}
              </Text>
              <Text style={styles.infoLinkText}>
                Twitter for {Platform.OS === "android" ? "Android" : "IOS"}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.tweetEng,
              styles.bottomBorder,
              styles.m7,
              styles.paddingTopBot,
            ]}
          >
            <TouchableOpacity style={styles.flexRow}>
              <Text style={styles.ml3}>600</Text>
              <Text style={[styles.textGray, styles.ml3]}>Retweets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexRow}>
              <Text style={styles.ml10}>60</Text>
              <Text style={[styles.textGray, styles.ml3]}>Quote Tweets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexRow}>
              <Text style={styles.ml10}>10000</Text>
              <Text style={[styles.textGray, styles.ml3]}>Likes</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.flexRow,
              styles.paddingTopBot,
              styles.spaceAround,
              styles.bottomBorder,
            ]}
          >
            <TouchableOpacity>
              <EvilIcons
                style={[{ marginRight: 2 }, styles.textGray]}
                name="comment"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons
                style={[{ marginRight: 2 }, styles.textGray]}
                name="retweet"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons
                style={[{ marginRight: 2 }, styles.textGray]}
                name="heart"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons
                style={[{ marginRight: 2 }, styles.textGray]}
                name={
                  Platform.OS === "android" ? "share-google" : "share-apple"
                }
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flexRow: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
    padding: 7,
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#e7e5eb",
  },
  paddingTopBot: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tweetHandle: {
    margin: 7,
  },
  tweetName: {
    fontWeight: "bold",
  },
  textGray: {
    color: "gray",
  },
  tweetContentCon: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  tweetContent: {
    lineHeight: 30,
    fontSize: 20,
  },
  tweetEng: {
    flexDirection: "row",
  },
  ml10: {
    marginLeft: 10,
  },
  ml3: {
    marginLeft: 3,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 9,
  },
  infoText: {
    color: "gray",
    marginRight: 10,
  },
  infoLinkText: {
    color: "#1d9bf1",
  },
});

export default TweetScreen;

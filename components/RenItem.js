import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import formatDistance from "../helpers/formateDateToNowStrict";
import { useNavigation } from "@react-navigation/native";
import screenNames from "../constants/screenNames";

const RenItem = ({ item: tweet }) => {
  const navigation = useNavigation();

  function goToPRofile(userId) {
    navigation.navigate(screenNames.PROFILE_SCREEN, {
      userId: userId,
    });
  }

  const goToTweet = (tweetId) => {
    navigation.navigate(screenNames.SINGLE_TWEET_SCREEN, {
      tweetId: tweetId,
    });
  };

  return (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToPRofile(tweet.user.id)}>
        <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => goToPRofile(tweet.user.id)}
        >
          <Text numberOfLines={1} style={styles.tweetName}>
            {tweet.user.name}
          </Text>
          <Text numberOfLines={1} style={[styles.tweetHandle, styles.textGray]}>
            @{tweet.user.username}
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={[styles.tweetHandle, styles.textGray]}>
            {formatDistanceToNowStrict(new Date(tweet.created_at), {
              locale: {
                ...locale,
                formatDistance,
              },
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToTweet(tweet.id)}>
          <Text style={styles.tweetText}>{tweet.body}</Text>
        </TouchableOpacity>
        <View style={styles.tweetEngCon}>
          <TouchableOpacity style={[styles.flexRow, styles.tweetEngagement]}>
            <EvilIcons
              style={[{ marginRight: 2 }, styles.textGray]}
              name="comment"
              size={24}
              color="black"
            />
            <Text style={styles.textGray}>300</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.tweetEngagement]}>
            <EvilIcons
              style={[{ marginRight: 2, marginLeft: 9 }, styles.textGray]}
              name="retweet"
              size={24}
              color="black"
            />
            <Text style={styles.textGray}>300</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.tweetEngagement]}>
            <EvilIcons
              style={[{ marginRight: 2, marginLeft: 9 }, styles.textGray]}
              name="heart"
              size={24}
              color="black"
            />
            <Text style={styles.textGray}>300</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.tweetEngagement]}>
            <EvilIcons
              style={[{ marginRight: 2, marginLeft: 9 }, styles.textGray]}
              name={Platform.OS === "android" ? "share-google" : "share-apple"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    height: 42,
    width: 42,
    borderRadius: 21,
    marginRight: 9,
  },
  flexRow: {
    flexDirection: "row",
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222222",
  },
  tweetHandle: {
    marginHorizontal: 9,
  },
  textGray: {
    color: "gray",
  },
  tweetText: {
    marginTop: 9,
    lineHeight: 15,
  },
  tweetEngCon: {
    flexDirection: "row",
  },
  tweetEngagement: {
    marginTop: 9,
    alignItems: "center",
  },
});

export default RenItem;

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import formatDistance from "../helpers/formateDateToNowStrict";
import screenNames from "../constants/screenNames";
import axiosConfig from "../helpers/axiosConfig";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);

  useEffect(() => {
    getAllTweets();
  }, [page]);

  function getAllTweets() {
    axiosConfig
      .get(`/tweets/?page=${page}`)
      .then((response) => {
        if (page === 1) {
          setData(response.data.data);
        } else {
          setData([...data, ...response.data.data]);
        }
        setIsLoading(false);
        setIsRefreshing(false);

        if (!response.data.next_page_url) {
          setIsAtEndOfScrolling(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }

  function handleRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getAllTweets();
  }

  function handleEnd() {
    setPage(page + 1);
  }

  const goToPRofile = () => {
    navigation.navigate(screenNames.PROFILE_SCREEN);
  };

  const goToTweet = (tweetId) => {
    navigation.navigate(screenNames.SINGLE_TWEET_SCREEN, {
      tweetId: tweetId,
    });
  };

  const goToNewTweet = () => {
    navigation.navigate(screenNames.NEW_TWEET_SCREEN);
  };

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToPRofile()}>
        <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.flexRow} onPress={() => goToPRofile()}>
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={styles.tweetSeperator}></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            !isAtEndOfScrolling && (
              <ActivityIndicator size="large" color="gray" />
            )
          }
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => goToNewTweet()}
      >
        <AntDesign name="plus" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
  tweetSeperator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d9bf1",
    position: "absolute",
    bottom: 20,
    right: 12,
  },
});

export default HomeScreen;

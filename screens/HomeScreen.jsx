import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
  },
  {
    id: "3",
    title: "Third Item",
  },
  {
    id: "4",
    title: "Fourth Item",
  },
  {
    id: "5",
    title: "Fifth Item",
  },
  {
    id: "6",
    title: "Sixth Item",
  },
  {
    id: "9",
    title: "Seventh Item",
  },
];

const HomeScreen = ({ navigation }) => {
  const goToPRofile = () => {
    navigation.navigate("Profile");
  };

  const goToTweet = () => {
    navigation.navigate("Tweet");
  };

  const goToNewTweet = () => {
    navigation.navigate("New Tweet");
  };

  const renderItem = ({ item }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToPRofile()}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.flexRow} onPress={() => goToPRofile()}>
          <Text numberOfLines={1} style={styles.tweetName}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={[styles.tweetHandle, styles.textGray]}>
            @itsme
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={[styles.tweetHandle, styles.textGray]}>
            9m
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToTweet()}>
          <Text style={styles.tweetText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
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
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.tweetSeperator}></View>
        )}
      />
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

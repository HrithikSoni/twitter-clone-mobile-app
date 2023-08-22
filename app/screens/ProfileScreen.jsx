import React, { useEffect, useState } from "react";
import axiosConfig from "../helpers/axiosConfig";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import RenItem from "../components/RenItem";

export default function ProfileScreen({ route }) {
  const [data, setData] = useState("");
  const [userTweets, setUserTweets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    getUserProfile();
    getUserTweets();
  }, []);

  useEffect(() => {
    getIsFollowing();
  }, []);

  function getUserProfile() {
    axiosConfig
      .get(`/users/${route.params.userId}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getUserTweets() {
    axiosConfig
      .get(`/users/${route.params.userId}/tweets?page=${page}`)
      .then((response) => {
        if (page === 1) {
          setUserTweets(response.data.data);
        } else {
          setUserTweets([...data, ...response.data.data]);
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

  function getIsFollowing() {
    axiosConfig
      .get(`/is_following/${route.params.userId}`)
      .then((response) => {
        console.log(response.data);
        setIsFollowing(response.data);
      })
      .catch((error) => console.log(error.response));
  }

  function unfollowUser() {
    axiosConfig
      .post(`/unfollow/${route.params.userId}`)
      .then(
        (response) => setIsFollowing(false),
        alert("You have Unfollowed this user")
      )
      .catch((error) => console.log(error.response));
  }

  function followUser() {
    axiosConfig
      .post(`/follow/${route.params.userId}`)
      .then(
        (response) => setIsFollowing(true),
        alert("You have followed this user")
      )
      .catch((error) => console.log(error.response));
  }

  function handleRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getUserTweets();
  }

  function handleEnd() {
    setPage(page + 1);
  }

  const ProfileHeader = () => (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
        }}
      />
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: data.avatar,
          }}
        />
        <View>
          {isFollowing ? (
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => unfollowUser()}
            >
              <Text style={styles.followButtonText}>Unfollow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => followUser()}
            >
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.profileName}>{data.name}</Text>
        <Text style={styles.profileHandle}>@{data.username}</Text>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.profileContainerText}>{data.profile}</Text>
      </View>

      <View style={styles.locationContainer}>
        <EvilIcons name="location" size={24} color="gray" />
        <Text style={styles.textGray}>{data.location}</Text>
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => Linking.openURL(data.link)}
        >
          <EvilIcons name="link" size={24} color="gray" />
          <Text style={styles.linkColor}>{data.linkText}</Text>
        </TouchableOpacity>
        <View style={[styles.linkItem, styles.ml4]}>
          <EvilIcons name="calendar" size={24} color="gray" />
          <Text style={styles.textGray}>Joined March 2009</Text>
        </View>
      </View>

      <View style={styles.followContainer}>
        <View style={styles.followItem}>
          <Text style={styles.followItemNumber}>509</Text>
          <Text style={styles.followItemLabel}>Following</Text>
        </View>
        <View style={[styles.followItem, styles.ml4]}>
          <Text style={styles.followItemNumber}>2,354</Text>
          <Text style={styles.followItemLabel}>Followers</Text>
        </View>
      </View>

      <View style={styles.separator}></View>
    </View>
  );

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          style={styles.container}
          data={userTweets}
          renderItem={(props) => <RenItem {...props} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          ListHeaderComponent={ProfileHeader}
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
    </>
  );
}

const styles = StyleSheet.create({
  textGray: {
    color: "gray",
  },
  ml4: {
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    width: 800,
    height: 120,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginTop: -34,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
  },
  followButton: {
    backgroundColor: "#0f1418",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  profileHandle: {
    color: "gray",
    marginTop: 1,
  },
  profileContainer: {
    paddingHorizontal: 10,
    marginTop: 8,
  },
  profileContainerText: {
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 4,
  },
  linkColor: {
    color: "#1d9bf1",
  },
  linkItem: {
    flexDirection: "row",
  },
  followContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  followItem: {
    flexDirection: "row",
  },
  followItemNumber: {
    fontWeight: "bold",
  },
  followItemLabel: {
    marginLeft: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
});

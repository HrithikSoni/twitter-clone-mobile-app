import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import screenNames from "../constants/screenNames";
import axiosConfig from "../helpers/axiosConfig";
import RenItem from "../components/RenItem";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({ route, navigation }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllTweets();
  }, [page]);

  useEffect(() => {
    if (route.params?.newTweetAdded) {
      getAllTweetsRefresh();
    }
  }, [route.params?.newTweetAdded]);

  function getAllTweetsRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(false);

    axiosConfig
      .get(`/tweets_all`)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }

  function getAllTweets() {
    // console.log("Auth Token", `Bearer ${user.token}`);

    axiosConfig
      .get(`/tweets_all/?page=${page}`)
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

  const goToNewTweet = () => {
    navigation.navigate(screenNames.NEW_TWEET_SCREEN);
  };

  function gotoNewTweet() {
    navigation.navigate(screenNames.NEW_TWEET_SCREEN);
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          data={data}
          renderItem={(props) => <RenItem {...props} />}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tweetSeperator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
});

export default HomeScreen;

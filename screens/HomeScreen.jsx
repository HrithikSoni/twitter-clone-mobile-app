import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import screenNames from "../constants/screenNames";
import axiosConfig from "../helpers/axiosConfig";
import RenItem from "../components/RenItem";

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

  const goToNewTweet = () => {
    navigation.navigate(screenNames.NEW_TWEET_SCREEN);
  };

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

import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

import { db } from "../../firebase/config";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { avatar, login, email, userId } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdDate", "desc")
    );

    onSnapshot(postsQuery, (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 32,
              marginHorizontal: 16,
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ height: 240, borderRadius: 8 }}
            />
            <View style={{ marginTop: 8 }}>
              <Text>{item.titlePhoto}</Text>
            </View>
            <View style={{ marginTop: 8, flexDirection: "row", gap: 30 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              >
                <Text>Comments</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              >
                <Text>Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default DefaultPostsScreen;

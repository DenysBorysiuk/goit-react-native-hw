import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route.params]);

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
            <View style={{ marginTop: 16 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
                <Text>Comments</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Map")}>
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

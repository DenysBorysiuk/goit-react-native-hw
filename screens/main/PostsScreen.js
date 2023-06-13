import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import DefaultPostsScreen from "../nested/DefaultScreenPosts";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import { Ionicons } from "@expo/vector-icons";

const nestedStack = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <nestedStack.Navigator>
      <nestedStack.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{
          headerLeft: false,
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Registration")}
            >
              <Ionicons
                name="ios-log-out-outline"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <nestedStack.Screen name="Comments" component={CommentsScreen} />
      <nestedStack.Screen name="Map" component={MapScreen} />
    </nestedStack.Navigator>
  );
};

export default PostsScreen;

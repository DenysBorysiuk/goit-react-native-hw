import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Home = ({ navigation }) => {
  const MainTab = createBottomTabNavigator();

  return (
    <MainTab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: { height: 60 },
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveTintColor: "#FFFFFF",
      })}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return { height: 60 };
          })(route),
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TouchableOpacity
              style={
                focused
                  ? { ...styles.tabIcon, backgroundColor: "#FF6C00" }
                  : styles.tabIcon
              }
              onPress={() => navigation.navigate("Posts")}
            >
              <Ionicons name="grid-outline" size={24} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={() => ({
          tabBarStyle: { display: "none" },
          headerTitle: "Створити публікацію",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreatePosts")}
            >
              <AntDesign name="plus" size={24} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TouchableOpacity
              style={
                focused
                  ? { ...styles.tabIcon, backgroundColor: "#FF6C00" }
                  : styles.tabIcon
              }
              onPress={() => navigation.navigate("Profile")}
            >
              <AntDesign name="user" size={24} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;

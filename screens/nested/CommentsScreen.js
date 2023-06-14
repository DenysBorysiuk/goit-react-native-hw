import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { postId } = route.params;
  const { userId, login, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const addComment = async () => {
    const createdDate = Date.now();
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      login,
      autorCommentId: userId,
      createdDate,
    });
    setComment("");
    Keyboard.dismiss();
  };

  const getAllComments = async () => {
    const commentsQuery = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdDate")
    );
    onSnapshot(commentsQuery, (data) =>
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={{ marginTop: 8 }}>
              <Text>{item.comment}</Text>
            </View>
            <View style={{ marginTop: 8, flexDirection: "row", gap: 30 }}>
              <Text>{item.login}</Text>
            </View>
          </View>
        )}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.btn} onPress={addComment}>
          <AntDesign name="arrowup" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  commentContainer: {
    marginBottom: 24,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#000000",
  },
  btn: {
    position: "absolute",
    bottom: 24,
    right: 26,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;

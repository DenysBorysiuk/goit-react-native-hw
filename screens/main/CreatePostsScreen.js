import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Ionicons, Feather } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [titlePhoto, setTitlePhoto] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
    setLocation(location);
    // console.log(location);
  };

  const deletePhoto = () => {
    setPhoto("");
    setTitlePhoto("");
    setLocation("");
    setPlace("");
  };

  const sendPost = () => {
    // if (titlePhoto && location && place) {
    // const post = {
    //   id: Date.now().toString(),
    //   img: titlePhoto,
    //   title: location,
    //   place: place,
    //   date: new Date().toLocaleDateString(),
    // };
    // dispatch(addPost(post));
    setTitlePhoto("");
    setLocation("");
    setPlace("");
    // setPhoto("");
    navigation.navigate("DefaultPosts", { photo });
    // console.log(post);
    // } else {
    //   console.log("Заповніть всі поля");
    // }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrap}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.PhotoWrap}>
              <Image
                style={{ width: "100%", height: 240, borderRadius: 8 }}
                source={{ uri: photo }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
            <Ionicons name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <Text style={styles.photoText}>
          {photo ? "Редагувати фото" : "Завантажте фото"}
        </Text>
        <TextInput
          style={{ ...styles.input, marginTop: 32 }}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          value={titlePhoto}
          onChangeText={setTitlePhoto}
        />
        <View style={{ marginTop: 16 }}>
          <TextInput
            style={{ ...styles.input, paddingLeft: 28 }}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            value={place}
            onChangeText={setPlace}
          />
          <Feather
            name="map-pin"
            size={20}
            color="#BDBDBD"
            style={{ position: "absolute", bottom: 13 }}
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={sendPost}
        >
          <Text
            style={{ ...styles.btnTitle, color: photo ? "#FFFFFF" : "#BDBDBD" }}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deletePhoto} style={styles.deleteBtn}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
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
  cameraWrap: {
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 32,
    marginHorizontal: 16,
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    margin: 20,
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  PhotoWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
  },
  photoText: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 32,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  deleteBtn: {
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    borderRadius: 20,
    marginTop: 120,
  },
});

export default CreatePostsScreen;

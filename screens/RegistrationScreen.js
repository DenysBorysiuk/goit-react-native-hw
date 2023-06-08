import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

const RegistrationScreen = () => {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.formWrap}>
            <Text style={styles.formTitle}>Register</Text>
            <View style={styles.form}>
              <View style={{ marginBottom: isShowKeyboard ? 10 : 0, gap: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Login"
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTitle}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Already have an account? Login</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formWrap: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    paddingBottom: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    textAlign: "center",
  },
  form: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    color: "#BDBDBD",
    paddingHorizontal: 15,
  },
  btn: {
    height: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 43,
  },
  btnTitle: {
    color: "#FFFFFF",
  },
  text: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },
});

export default RegistrationScreen;

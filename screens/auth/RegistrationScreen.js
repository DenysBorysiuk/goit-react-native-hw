import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/operations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = async () => {
    keyboardHide();
    setState(initialState);
    // const photo = await uploadPhotoToServer();
    dispatch(authSignUpUser(state));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          style={styles.image}
        >
          <View
            style={{
              ...styles.formWrap,
              paddingBottom: isShowKeyboard ? 0 : 45,
            }}
          >
            <Text style={styles.formTitle}>Реєстрація</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Логін"
                onFocus={() => setIsShowKeyboard(true)}
                value={state.login}
                onChangeText={(value) => setState({ ...state, login: value })}
              />
              <TextInput
                style={{ ...styles.input, marginTop: 16 }}
                placeholder="Адреса електронної пошти"
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={(value) => setState({ ...state, email: value })}
              />
              <TextInput
                style={{ ...styles.input, marginTop: 16 }}
                placeholder="Пароль"
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={(value) =>
                  setState({ ...state, password: value })
                }
              />
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnTitle} onPress={onSubmit}>
                  Зареєстуватися
                </Text>
              </TouchableOpacity>
              <View style={styles.wrapper}>
                <Text style={styles.text}>Вже є акаунт?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.link}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    fontFamily: "Roboto-Medium",
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
    paddingHorizontal: 15,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  link: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textDecorationLine: "underline",
  },
});

export default RegistrationScreen;

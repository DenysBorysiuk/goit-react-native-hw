import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../router";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../redux/auth/operations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const routing = useRoute(stateChange);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

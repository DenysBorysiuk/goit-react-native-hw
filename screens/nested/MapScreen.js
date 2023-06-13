import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  // const { latitude, longitude } = route.params.location;
  // const { title } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.516339,
          longitude: 30.602185,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: 50.516339, longitude: 30.602185 }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;

import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootTabScreenProps } from "../types";

interface Props {}

export declare type LocationObject = {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
};

export default function GpsScreen({ navigation }: RootTabScreenProps<"Gps">) {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Low,
          timeInterval: 500,
          distanceInterval: 1,
        },
        (location) => {
          console.log(location);
          setLocation(location);
        }
      );
    })();
  }, []);

  let object: String | LocationObject = "Waiting..";
  let done: boolean = false;
  if (errorMsg) {
    object = errorMsg;
  } else if (location) {
    object = location;
    done = true;
  }

  return (
    <SafeAreaView style={styles.container}>
      {object && done ? (
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            {timestampToNormal((object as LocationObject).timestamp as number)}
          </Text>
          <Text style={styles.paragraph}>
            Latitude: {(object as LocationObject).coords.latitude}
          </Text>
          <Text style={styles.paragraph}>
            Longitude: {(object as LocationObject).coords.longitude}
          </Text>
          <Text style={styles.paragraph}>
            Altitude: {(object as LocationObject).coords.altitude}
          </Text>
          <Text style={styles.paragraph}>
            Accuracy: {(object as LocationObject).coords.accuracy}
          </Text>
          <Text style={styles.paragraph}>
            AltitudeAccuracy:
            {(object as LocationObject).coords.altitudeAccuracy}
          </Text>
          <Text style={styles.paragraph}>
            Heading: {(object as LocationObject).coords.heading}
          </Text>
          <Text style={styles.paragraph}>
            Speed: {(object as LocationObject).coords.speed}
          </Text>
        </View>
      ) : (
        <Text style={styles.paragraph}>object</Text>
      )}
    </SafeAreaView>
  );
}

function timestampToNormal(timestamp: number): string {
  let date = new Date(timestamp);
  return date.toString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});

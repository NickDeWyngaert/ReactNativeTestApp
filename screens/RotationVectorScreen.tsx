import { useDeviceMotion } from "@use-expo/sensors";
import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

interface Props {}

export interface MotionObject {
  acceleration: {
    x: number;
    y: number;
    z: number;
  };
  accelerationIncludingGravity: {
    x: number;
    y: number;
    z: number;
  };
  orientation: number;
  rotation: {
    alpha: number;
    beta: number;
    gamma: number;
  };
  rotationRate: {
    alpha: number;
    beta: number;
    gamma: number;
  };
}

export default function RotationVectorScreen(props: Props) {
  const [data, available] = useDeviceMotion({ interval: 100 });
  return (
    <SafeAreaView style={styles.container}>
      {available && data ? (
        <View style={styles.container}>
          {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
          <Text style={styles.text}>
            Rotation Alpha: {round((data as MotionObject).rotation.alpha)}
          </Text>
          <Text style={styles.text}>
            Rotation Beta: {round((data as MotionObject).rotation.beta)}
          </Text>
          <Text style={styles.text}>
            Rotation Gamma: {round((data as MotionObject).rotation.gamma)}
          </Text>
        </View>
      ) : (
        <Text style={styles.text}>unavailable</Text>
      )}
    </SafeAreaView>
  );
}

function round(n: any) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

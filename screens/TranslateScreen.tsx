import * as React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootTabScreenProps } from "../types";

export default function TranslateScreen({
  navigation,
}: RootTabScreenProps<"Translate">) {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("hello")}</Text>
      <TouchableOpacity
        onPress={() =>
          i18n.changeLanguage(i18n.language === "nl" ? "en" : "nl")
        }
      >
        <Text>{t("change")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});

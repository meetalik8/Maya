import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const localImage = require("../assets/images/logo.png");

export default function ProficiencySelection() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={localImage} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.headline}>
            How proficient are you in this language?
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Beginner")}
        >
          <Text style={styles.buttonText}>I am a beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FewWords")}
        >
          <Text style={styles.buttonText}>I know a few words</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  headline: {
    fontSize: 18,
    fontFamily: "sans-serif",
    flexWrap: "wrap",
  },
  button: {
    margin: 5,
    padding: 10,
    backgroundColor: "#3884fd",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
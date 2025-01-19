import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

const Beginner = () => {
  const navigation = useNavigation();

  const handleFlashcardPress = () => {
    navigation.navigate("HindiFlashcards");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Beginner Hindi Learning</Text>
      <Text style={styles.subheading}>Get started with Hindi flashcards!</Text>

      <TouchableOpacity style={styles.button} onPress={handleFlashcardPress}>
        <Text style={styles.buttonText}>View Hindi Flashcards</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    padding: 15,
    backgroundColor: "#3884fd",
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default Beginner;

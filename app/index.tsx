import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation if you want to navigate

const WelcomeScreen = () => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Maya!</Text>
      <Image
        source={require("../assets/logo.png")} // Adjust the path to your logo image
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Your Indian language learning app</Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate("ProficiencySelection")} // Navigate to ProficiencySelection screen
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3884fd", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF", 
    marginBottom: 20,
  },
  logo: {
    width: 200, 
    height: 180, 
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#F2D16A", // Yellow color
    marginBottom: 30,
    textAlign: "center",
  },
  getStartedButton: {
    backgroundColor: "#F2D16A", // Yellow background for button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#000000", // Black text color
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;

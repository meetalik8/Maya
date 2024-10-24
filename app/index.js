import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Animated, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const WelcomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const scaleValueHindi = useRef(new Animated.Value(1)).current;
  const scaleValueMarathi = useRef(new Animated.Value(1)).current;

  // Avoid updating state inside the animation loop to prevent infinite re-renders
  const handleLanguagePress = (language, scaleValue) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedLanguage(language); // Set the selected language here
  
      // Navigate to AdaptiveQuizIntro and pass the language as a parameter
      navigation.navigate("AdaptiveQuizIntro", { language });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navIcon}>☰</Text>
        <Image source={require('../assets/logo-nobg.png')} style={styles.logo} />
      </View>

      <Image source={require('../assets/logo-nobg.png')} style={styles.topImage} />
      <Text style={styles.heading}>Welcome to Maya!</Text>
      <Text style={styles.subheading}>An Indian Language Learning App</Text>
      <Text style={styles.getStartedText}>Let's get started!</Text>
      <Text style={[styles.subheading, styles.boldSubheading]}>What language do you want to learn?</Text>

      <View style={styles.languageContainer}>
        {/* Hindi Flashcard */}
        <TouchableOpacity onPress={() => handleLanguagePress('Hindi', scaleValueHindi)}>
          <Animated.View style={[styles.flashcard, { transform: [{ scale: scaleValueHindi }] }]}>
            <Image source={require('../assets/hindi.png')} style={styles.languageImage} />
            <Text style={styles.languageText}>Hindi</Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Marathi Flashcard */}
        <TouchableOpacity onPress={() => handleLanguagePress('Marathi', scaleValueMarathi)}>
          <Animated.View style={[styles.flashcard, { transform: [{ scale: scaleValueMarathi }] }]}>
            <Image source={require('../assets/marathi.png')} style={styles.languageImage} />
            <Text style={styles.languageText}>Marathi</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    top: 0,
  },
  navIcon: {
    fontSize: 24,
  },
  logo: {
    width: 50,
    height: 50,
  },
  topImage: {
    width: 150, // Increased size
    height: 150, // Increased size
    marginBottom: 10,
    marginTop: 10, // Adjusted for spacing
  },
  heading: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    color: '#3884fd', // Blue color
    marginBottom: 5,
  },
  subheading: {
    fontSize: 16,
    color: '#000', // Black color
    marginBottom: 10, // Reduced margin
  },
  boldSubheading: {
    fontWeight: 'bold', // Bold for "What language do you want to learn?"
  },
  getStartedText: {
    fontSize: 16,
    color: '#000', // Black color
    marginBottom: 10, // Reduced margin
    fontWeight: 'normal', // Normal weight for the get started text
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  flashcard: {
    width: 150,
    height: 200,
    backgroundColor: '#F2D16A', // Blue color
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    elevation: 5,
  },
  languageImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  languageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default WelcomeScreen;

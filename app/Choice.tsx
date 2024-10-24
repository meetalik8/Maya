import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import useFonts from "@/hooks/useFonts";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { firestoreDB } from "@/config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ChoiceScreen: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const user = useSelector((state) => state.user);
  console.log("logged user: ", user);
  const fontsLoaded = useFonts();
 
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      console.log("Retrieved User ID: ", id);
      setUserId(id); 
    };
     if (fontsLoaded) {
       fetchUserId();
     }
  }, [fontsLoaded]);
  if(!fontsLoaded){
    return null;
  }
  
  const storeUserLanguageChoice = async (language: string) => {
    if (!userId) return;
    console.log("Storing language choice:", language);
    try {
      await setDoc(
        doc(firestoreDB, "users", userId),
        { language },
        { merge: true }
      );
      console.log("Language choice stored successfully!", language);
    } catch (error) {
      console.error("Error storing language choice: ", error);
    }
  };


  const handleLanguagePress = (language: string) => {
    console.log(`Language selected: ${language}`);
    setSelectedLanguage(language);
    storeUserLanguageChoice(language) 
      .then(() => {
        console.log(
          "User language choice stored, navigating to ProficiencySelection..."
        );
        router.push("/ProficiencySelection");
      })
      .catch((error) => {
        console.error("Error during language choice storage: ", error);
      });
  };


  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-nobg.png")}
        style={styles.topImage}
      />
      <Text style={styles.getStartedText}>Let's get you started!</Text>
      <Text style={[styles.subheading, styles.boldSubheading]}>
        What language do you want to learn?
      </Text>

      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={() => handleLanguagePress("Hindi")}>
          <View style={styles.flashcard}>
            <Image
              source={require("../assets/hindi.png")}
              style={styles.languageImage}
            />
            <Text style={styles.languageText}>Hindi</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLanguagePress("Marathi")}>
          <View style={styles.flashcard}>
            <Image
              source={require("../assets/marathi.png")}
              style={styles.languageImage}
            />
            <Text style={styles.languageText}>Marathi</Text>
          </View>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  topImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3884fd",
    marginBottom: 5,
    fontFamily: "NunitoBold",
  },
  subheading: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
    fontFamily: "NunitoBold",
  },
  boldSubheading: {
    // fontWeight: "bold",
    fontFamily: "NunitoBold",
  },
  getStartedText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
    fontWeight: "normal",
    fontFamily: "NunitoBold",
  },
  languageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  flashcard: {
    width: 150,
    height: 200,
    backgroundColor: "#F2D16A",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
    // fontWeight: "bold",
    color: "#000",
    fontFamily: "NunitoBold",
  },
});

export default ChoiceScreen;

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { firestoreDB } from "../config/firebase.config";
import useFonts from "@/hooks/useFonts";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const localImage = require("../assets/images/logo.png");

export default function ProficiencySelection() {
  const fontsLoaded = useFonts();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [content, setContent] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const user = useSelector((state: any) => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        const userDoc = await getDoc(doc(firestoreDB, "users", id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const language = userData.language;
          setSelectedLanguage(language);
          fetchQuizData(language);
        }
      }
      if (fontsLoaded) {
        fetchUserData();
      }
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const fetchQuizData = async (language: string) => {
    try {
      const quizDoc = await getDoc(doc(firestoreDB, "quizData", language));
      if (quizDoc.exists()) {
        setContent(quizDoc.data().questions || []);
      }
    } catch (error) {
      console.error("Error fetching quiz data: ", error);
    }
  };

  const storeUserProficiency = async (userId: string, proficiency: string) => {
    try {
      await setDoc(
        doc(firestoreDB, "users", userId),
        { proficiency },
        { merge: true }
      );
    } catch (error) {
      console.error("Error storing proficiency: ", error);
    }
  };

  const handleBeginnerPress = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (id) {
      await storeUserProficiency(id, "Beginner");
    }
    router.push("/Home");
  };

  const handleFewWordsPress = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (id) {
      await storeUserProficiency(id, "Few Words");
    }
    router.push("/FewWords");
  };

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
        <TouchableOpacity style={styles.button} onPress={handleBeginnerPress}>
          <Text style={styles.buttonText}>I am a beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFewWordsPress}>
          <Text style={styles.buttonText}>I know a few words</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "NunitoBold",
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
    fontFamily: "NunitoBold",
    flexWrap: "wrap",
  },
  button: {
    margin: 5,
    paddingHorizontal: 100,
    paddingVertical: 10,
    backgroundColor: "#3884fd",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "NunitoReg",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestoreDB } from "@/config/firebase.config";
import { useNavigation } from "@react-navigation/native";

interface HindiCharacter {
  character: string;
  pronunciation: string;
}

const hindiData: HindiCharacter[] = [
  { character: "अ", pronunciation: "a" },
  { character: "आ", pronunciation: "aa" },
  { character: "इ", pronunciation: "i" },
  { character: "ई", pronunciation: "ii" },
  { character: "उ", pronunciation: "u" },
  { character: "ऊ", pronunciation: "oo" },
  { character: "ऍ", pronunciation: "ae" },
  { character: "ओ", pronunciation: "o" },
  { character: "औ", pronunciation: "au" },
  { character: "अं", pronunciation: "am" },
  { character: "अः", pronunciation: "ah" },
];

const HindiFlashcards: React.FC = () => {
  const [proficiency, setProficiency] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        setUserId(id);
        if (id) {
          const userDoc = await getDoc(doc(firestoreDB, "users", id));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setProficiency(data.proficiency || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleMarkCompleted = async () => {
    try {
      const newProficiency = Math.min(proficiency + 2, 100); // Increment by 2%, max 100%
      setProficiency(newProficiency);

      if (userId) {
        await updateDoc(doc(firestoreDB, "users", userId), {
          proficiency: newProficiency,
        });
      }

      Alert.alert("Lesson Completed", "Your progress has been updated!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (error) {
      console.error("Error updating proficiency:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hindi Alphabets</Text>
      <View style={styles.flashcardContainer}>
        {hindiData.map((item, index) => (
          <View key={index} style={styles.flashcard}>
            <Text style={styles.character}>{item.character}</Text>
            <Text style={styles.pronunciation}>{item.pronunciation}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.markButton} onPress={handleMarkCompleted}>
        <Text style={styles.markButtonText}>Mark Completed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3884fd",
    marginTop: 60,
    marginBottom: 20,
  },
  flashcardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  flashcard: {
    width: "30%",
    height: 150,
    backgroundColor: "#F2D16A",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 5,
  },
  character: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
  },
  pronunciation: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#000",
  },
  markButton: {
    backgroundColor: "#3884fd",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  markButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HindiFlashcards;

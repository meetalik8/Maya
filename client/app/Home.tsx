import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { firestoreDB } from "@/config/firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { router } from "expo-router";

interface UserData {
  proficiency: string;
  streak: number;
}

export default function HomePage() {
  const [streak, setStreak] = useState<number>(0);
  const [levelStatus, setLevelStatus] = useState<boolean[]>([
    true,
    false,
    false,
  ]);
  const [userId, setUserId] = useState<string | null>(null);
  const [proficiency, setProficiency] = useState<string>("");

  useEffect(() => {
    const fetchUserIdAndData = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
      if (id) {
        const userDoc = await getDoc(doc(firestoreDB, "users", id));
        if (userDoc.exists()) {
          const data = userDoc.data() as UserData;
          setProficiency(data.proficiency);
          setStreak(data.streak || 0);
        }
      }
    };
    fetchUserIdAndData();
  }, []);

  const handleChatBot=()=> {
    router.push("/ChatBot");
  }
  const handleChat=() =>{
    router.push("/Chat");
  }
  const handleStartLearning = () => {
    console.log("Pressed start learning");
    router.push("/Beginner");
  };
  const handleLessonComplete = async (level: number) => {
    let newStreak = streak;

    if (streak === 0) {
      newStreak = 1;
    }

    setStreak(newStreak);
    setLevelStatus((prev) => {
      const newStatus = [...prev];
      newStatus[level] = true;
      return newStatus;
    });

    if (userId) {
      await updateDoc(doc(firestoreDB, "users", userId), {
        streak: newStreak,
      });
    }
  };

  const progressPercentage =
    proficiency === "Beginner" ? 1 : proficiency === "Few Words" ? 5 : 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.streakText}>Streak: {streak}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Your Progress</Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
        <Text style={styles.progressPercentage}>
          {progressPercentage}% Complete
        </Text>
      </View>

      <View style={styles.levelsContainer}>
        {levelStatus.map((isUnlocked, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.levelCard,
              { backgroundColor: isUnlocked ? "#ffffff" : "#e0e0e0" },
            ]}
            onPress={() => isUnlocked && handleLessonComplete(index + 1)}
            disabled={!isUnlocked}
          >
            <Text style={styles.levelText}>
              {isUnlocked ? `Level ${index + 1}` : `Locked`}
            </Text>
            <Text style={styles.levelDescription}>
              {index === 0
                ? "Learn the Basics"
                : index === 1
                ? "Learn the Forms of Letters"
                : "Next Level"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText} onPress={handleStartLearning}>
          Start Learning
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText} onPress={handleChat}>
          Community
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText} onPress={handleChatBot}>
          ChatBot
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  navBar: {
    padding: 10,
    backgroundColor: "#3884fd",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  streakText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginVertical: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3884fd",
    borderRadius: 5,
  },
  progressPercentage: {
    textAlign: "right",
    fontSize: 14,
    color: "#555",
  },
  levelsContainer: {
    marginBottom: 20,
  },
  levelCard: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    marginVertical: 10,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  levelDescription: {
    fontSize: 14,
    color: "#555",
  },
  startButton: {
    backgroundColor: "#3884fd",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

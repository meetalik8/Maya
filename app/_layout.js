import { Stack } from "expo-router"; // Using expo-router for navigation
import React from "react";
import HindiFlashcards from "./HindiFlashcards"; // Ensure the path is correct
import AdaptiveQuiz from "./AdaptiveQuiz"; // Import the new Adaptive Quiz screen
import AdaptiveQuizIntro from "./AdaptiveQuizIntro";

export default function RootLayout() {
  return (
    <Stack>
      {/* Define the initial screen of the app */}
      <Stack.Screen
        name="index"
        options={{ title: "Maya" }} // Title for the Home screen
      />

      {/* Define additional screens for navigation */}
      <Stack.Screen
        name="ProficiencySelection"
        options={{ title: "Select Your Proficiency" }} // Title for Proficiency Selection
      />
      <Stack.Screen
        name="Beginner"
        options={{ title: "Beginner Lessons" }} // Title for Beginner lessons
      />

      {/* Register HindiFlashcards screen */}
      <Stack.Screen
        name="HindiFlashcards"
        options={{ title: "Hindi Flashcards" }} // Title for Hindi Flashcards
      />

      {/* Register Adaptive Quiz screen */}
      <Stack.Screen
        name="AdaptiveQuiz"
        options={{ title: "Adaptive Hindi Quiz" }} // Title for Adaptive Quiz
      />
      <Stack.Screen
        name="AdaptiveQuizIntro"
        options={{ title: "Adaptive Hindi Quiz Intro" }} // Title for Adaptive Quiz
      />
      <Stack.Screen 
      name="LearningModules" component={LearningModules} 
      options={{ title: "Choose where to start" }}
      />
      <Stack.Screen 
      name="SpeechRecognition" component={SpeechRecognition} 
      options={{ title: "Lets check you pronunciation" }}
      />
    </Stack>
  );
}
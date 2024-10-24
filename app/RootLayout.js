import React from "react";
import { Stack } from "expo-router"; // Using expo-router for navigation
import LearningModules from "./LearningModules"; // Import LearningModules component
import SpeechRecognition from "./SpeechRecognition"; // Import SpeechRecognition component
import ProficiencySelection from "./ProficiencySelection"; // Import other components as needed
import Beginner from "./Beginner"; // Import other components as needed
import HindiFlashcards from "./HindiFlashcards"; // Import other components as needed
import AdaptiveQuiz from "./AdaptiveQuiz"; // Import other components as needed
import AdaptiveQuizIntro from "./AdaptiveQuizIntro"; // Import other components as needed

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Maya" }}
      />
      <Stack.Screen
        name="LearningModules"
        component={LearningModules}
        options={{ title: "Choose where to start" }}
      />
      <Stack.Screen
        name="ProficiencySelection"
        component={ProficiencySelection}
        options={{ title: "Select Your Proficiency" }}
      />
      <Stack.Screen
        name="Beginner"
        component={Beginner}
        options={{ title: "Beginner Lessons" }}
      />
      <Stack.Screen
        name="HindiFlashcards"
        component={HindiFlashcards}
        options={{ title: "Hindi Flashcards" }}
      />
      <Stack.Screen
        name="AdaptiveQuiz"
        component={AdaptiveQuiz}
        options={{ title: "Adaptive Hindi Quiz" }}
      />
      <Stack.Screen
        name="AdaptiveQuizIntro"
        component={AdaptiveQuizIntro}
        options={{ title: "Adaptive Hindi Quiz Intro" }}
      />
      <Stack.Screen
        name="SpeechRecognition"
        component={SpeechRecognition}
        options={{ title: "Let's check your pronunciation" }}
      />
      <Stack.Screen
        name="WritingScreen"
        options={{ title: "Let's check your grammar" }}
      />
    </Stack>
  );
};

export default RootLayout;

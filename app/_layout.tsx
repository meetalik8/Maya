import { Stack } from "expo-router"; // Using expo-router for navigation
import React from "react";
import HindiFlashcards from "./HindiFlashcards"; // Ensure the path is correct

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
      <Stack.Screen 
        name="FewWords" 
        options={{ title: "Learn a Few Words" }} // Title for Few Words
      />
      
      {/* Register HindiFlashcards screen */}
      <Stack.Screen 
        name="HindiFlashcards" 
        options={{ title: "Hindi Flashcards" }} // Title for Hindi Flashcards
      />
    </Stack>
  );
}

import { Stack } from "expo-router"; // Using expo-router for navigation
import React from "react";
import HindiFlashcards from "./HindiFlashcards"; // Ensure the path is correct

export default function RootLayout() {
  return (
    <Stack>
      {/* Define the initial screen of the app */}
      <Stack.Screen name="index" />

      {/* Define additional screens for navigation */}
      <Stack.Screen name="ProficiencySelection" />
      <Stack.Screen name="Beginner" />
      <Stack.Screen name="FewWords" />
      {/* Register HindiFlashcards screen */}
      <Stack.Screen name="HindiFlashcards"/>
    </Stack>
  );
}

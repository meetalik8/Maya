import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import Store from "../context/store";

export default function RootLayout() {
  return (
    <Provider store={Store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="Choice" options={{ headerShown: false }} />
        <Stack.Screen
          name="ProficiencySelection"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Beginner" options={{ headerShown: false }} />
        <Stack.Screen name="FewWords" options={{ headerShown: false }} />

        <Stack.Screen name="HindiFlashcards" options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="Chat" options={{ headerShown: false }} />
        <Stack.Screen name="AddChat" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}

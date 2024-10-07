import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="ProficiencySelection" />
      <Stack.Screen name="Beginner" />
      <Stack.Screen name="FewWords" />
    </Stack>
  );
}

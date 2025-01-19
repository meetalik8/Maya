import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import useFonts from "@/hooks/useFonts";


const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
   const fontsLoaded = useFonts();

   if (!fontsLoaded) {
     return null;
   }
  
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.button, containerStyles, isLoading && styles.loading]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f2d16a",
    borderRadius: 16,
    minHeight: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    opacity: 0.5,
  },
  text: {
    color: "#000",
    fontSize: 18,
    fontFamily: "NunitoBold",
  },
});

export default CustomButton;

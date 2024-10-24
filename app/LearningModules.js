import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LearningModules = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <AnimatedModule title="Reading" />
      <AnimatedModule title="Listening" />
      <AnimatedModule title="Speaking" onPress={() => navigation.navigate('SpeechRecognition')} />
      <AnimatedModule title="Writing" onPress={() => navigation.navigate('WritingScreen')}/>
    </View>
  );
};

// Define the AnimatedModule component
const AnimatedModule = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.moduleButton}>
      <Text style={styles.moduleText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  moduleButton: {
    backgroundColor: '#3884fd',
    padding: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5, // For Android shadow effect
    shadowColor: '#000', // For iOS shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  moduleText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LearningModules;

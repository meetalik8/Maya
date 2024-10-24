// AdaptiveQuizIntro.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AdaptiveQuizIntro = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route prop
  const { language } = route.params; // Get language from route params

  const startQuiz = () => {
    navigation.navigate('AdaptiveQuiz', { language });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>
        Let's check your proficiency level in {language}!
      </Text>
      
      <TouchableOpacity style={styles.nextButton} onPress={startQuiz}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  introText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#3884fd',
    padding: 15,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

<<<<<<< HEAD
export default AdaptiveQuizIntro;
=======
export default AdaptiveQuizIntro;
>>>>>>> 348e8fd22928b3d0d1bb1b1af724c972de6727ab

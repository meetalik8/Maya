import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import questionsData from '../assets/proficiencyquestions.json'; // Importing JSON data

const AdaptiveQuiz = ({ route }) => {
  const language = route?.params?.language;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Shuffle and slice the first 10 random questions
    const shuffledQuestions = questionsData.sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    if (questions.length > 0 && questionIndex < questions.length) {
      const question = questions[questionIndex];
      setCurrentQuestion(question);
      setCurrentOptions(getRandomOptions(question.Hindi));
    }
  }, [questions, questionIndex]);

  const getRandomOptions = (correctAnswer) => {
    // Filter out the correct answer and get 3 random options from Hindi
    const incorrectOptions = questions
      .filter((q) => q.Hindi !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((q) => q.Hindi); // Get incorrect Hindi options

    const options = [...incorrectOptions, correctAnswer].sort(() => 0.5 - Math.random());
    return options;
  };

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentQuestion.Hindi;

    // Update score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // End the quiz and show results
      const finalResult = score >= 7 ? 'Advanced' : score >= 4 ? 'Intermediate' : 'Beginner';
      setResult(finalResult);
    }
  };

  const progressPercentage = ((questionIndex + 1) / questions.length) * 100; // Calculate progress

  if (result) {
    return (
      <View style={styles.resultContainer}>
        <Image source={require('../assets/logo-nobg.png')} style={styles.logo} />
        <Text style={styles.congratulationsText}>Congratulations!</Text>
        <Text style={styles.proficiencyText}>Your current Hindi proficiency level is:</Text>
        <Text style={[styles.resultText, { color: '#3884fd' }]}>{result}</Text>
        <Text style={styles.scoreText}>You scored: {score}/10</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Implement retake logic */}}>
          <Text style={styles.buttonText}>Retake the Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* Implement start learning logic */}}>
          <Text style={styles.buttonText}>Start Learning</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentQuestion) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.questionNumberContainer}>
          <Text style={styles.questionIndex}>{`Q${questionIndex + 1}`}</Text>
        </View>
        <Text style={styles.questionLabel}>Translate the word:</Text>
        <Text style={styles.questionText}>{currentQuestion.English}</Text>
        
        <View style={styles.gap} />
        
        <View style={styles.optionsContainer}>
          {currentOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.gap} />

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>{`Progress: ${Math.round(progressPercentage)}%`}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Set a background color for the container
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionNumberContainer: {
    backgroundColor: '#007BFF', // Badge color
    borderRadius: 20, // Rounded edges
    paddingVertical: 5, // Smaller vertical padding for a smaller badge
    paddingHorizontal: 15, // Smaller horizontal padding for a smaller badge
    marginBottom: 10,
    alignSelf: 'center', // Center align the badge
  },
  questionIndex: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color for contrast
  },
  questionLabel: {
    fontSize: 20,
    marginVertical: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3884fd', // Question in blue color
  },
  gap: {
    height: 20, // Gap height between elements
  },
  optionsContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    flexWrap: 'wrap', // Allow wrapping to create a grid
    justifyContent: 'space-between', // Distribute space evenly
    width: '100%', // Full width
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#F2D16A',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5, // Add vertical margin between buttons
    width: '48%', // Take almost half the width for 2x2 layout
  },
  optionText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#3884fd',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  proficiencyText: {
    fontSize: 20,
    marginVertical: 10,
  },
  resultText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#F2D16A',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default AdaptiveQuiz;

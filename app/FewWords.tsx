import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import quizData from "../quizdata"; 
import { router } from "expo-router";

interface Option {
  id: number;
  text: string;
  image: any; 
}

interface Question {
  question: string;
  options?: Option[];
  correctAnswerId?: number;
  correctAnswer?: string;
}

type QuizData = Question[];

const quiz: QuizData = quizData;

const FewWords: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleOptionPress = (optionId: number) => {
    if (optionId === quiz[currentQuestionIndex].correctAnswerId) {
      setScore(score + 1);
    }
    goToNextQuestion();
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = quiz[currentQuestionIndex];
    if (
      currentQuestion.correctAnswer &&
      userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
    ) {
      setScore(score + 1);
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
    goToNextQuestion();
    setUserAnswer("");
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setIsAnswerCorrect(null);
  };

  const currentQuestion = quiz[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.finalScore}>Your Score: {score}</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={() => router.push("/Home")}>
          <Text style={styles.arrowText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options ? (
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => handleOptionPress(option.id)}
            >
              <Image source={option.image} style={styles.optionImage} />
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.fillInBlankContainer}>
          <Text style={styles.fillInBlankText}>_____(Fill in the blank)</Text>
          <TextInput
            style={styles.input}
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Type your answer here"
          />
          <TouchableOpacity onPress={handleSubmitAnswer}>
            <Text style={styles.submitButton}>Submit</Text>
          </TouchableOpacity>
          {isAnswerCorrect !== null && (
            <Text style={styles.feedback}>
              {isAnswerCorrect ? "Correct!" : "Incorrect, try again!"}
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity style={styles.arrowButton} onPress={() => router.push("/Home")}>
        <Text style={styles.arrowText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#F2D16A",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    width: 150,
    height: 150,
    justifyContent: "center",
  },
  optionImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  optionText: {
    color: "#000",
  },
  fillInBlankContainer: {
    alignItems: "center",
  },
  fillInBlankText: {
    fontSize: 18,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#3884fd",
    padding: 10,
    color: "#FFF",
    borderRadius: 5,
  },
  finalScore: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#3884fd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "80%",
  },
  feedback: {
    marginTop: 10,
    fontSize: 16,
  },
  arrowButton: {
    position: "absolute",
    bottom: 30, 
    backgroundColor: "#3884fd",
    padding: 10,
    borderRadius: 5,
  },
  arrowText: {
    fontSize: 24,
    color: "#FFF",
  },
});

export default FewWords;

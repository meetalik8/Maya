import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import questionsData from "../assets/proficiencyquestions.json";
import { useNavigation, RouteProp } from "@react-navigation/native";

const AdaptiveQuiz: React.FC<{
  route: RouteProp<{ params: { language: string } }, string>;
}> = ({ route }) => {
  const language = route?.params?.language;
  const navigation = useNavigation();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const shuffledQuestions = questionsData
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    if (questions.length > 0 && questionIndex < questions.length) {
      const question = questions[questionIndex];
      setCurrentQuestion(question);
      setCurrentOptions(getRandomOptions(question.Hindi));
    }
  }, [questions, questionIndex]);

  const getRandomOptions = (correctAnswer: string) => {
    const incorrectOptions = questions
      .filter((q) => q.Hindi !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((q) => q.Hindi);

    const options = [...incorrectOptions, correctAnswer].sort(
      () => 0.5 - Math.random()
    );
    return options;
  };

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === currentQuestion.Hindi;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const finalResult =
        score >= 7 ? "Advanced" : score >= 4 ? "Intermediate" : "Beginner";
      setResult(finalResult);
    }
  };

  const progressPercentage = ((questionIndex + 1) / questions.length) * 100;

  if (result) {
    return (
      <View style={styles.resultContainer}>
        <Image
          source={require("../assets/logo-nobg.png")}
          style={styles.logo}
        />
        <Text style={styles.congratulationsText}>Congratulations!</Text>
        <Text style={styles.proficiencyText}>
          Your current Hindi proficiency level is:
        </Text>
        <Text style={[styles.resultText, { color: "#3884fd" }]}>{result}</Text>
        <Text style={styles.scoreText}>You scored: {score}/10</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Retake the Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
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
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.gap} />

        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${progressPercentage}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{`Progress: ${Math.round(
          progressPercentage
        )}%`}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionNumberContainer: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignSelf: "center",
  },
  questionIndex: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  questionLabel: {
    fontSize: 20,
    marginVertical: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3884fd",
  },
  gap: {
    height: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#F2D16A",
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    width: "48%",
  },
  optionText: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  progressBarContainer: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#3884fd",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  proficiencyText: {
    fontSize: 20,
    marginVertical: 10,
  },
  resultText: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#F2D16A",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default AdaptiveQuiz;

// quizData.js

const quizData = [
  {
    question: "What does this word mean: 'बिल्ली'?",
    options: [
      { id: 1, text: "Cat", image: require("./assets/cat.png") },
      { id: 2, text: "Dog", image: require("./assets/dog.png") },
      { id: 3, text: "Mouse", image: require("./assets/mouse.png") },
      { id: 4, text: "Elephant", image: require("./assets/elephant.png") },
    ],
    correctAnswerId: 1,
  },
  {
    question: "What does this word mean: 'पानी'?",
    options: [
      { id: 1, text: "Fire", image: require("./assets/fire.webp") },
      { id: 2, text: "Water", image: require("./assets/water.webp") },
      { id: 3, text: "Air", image: require("./assets/air.png") },
      { id: 4, text: "Earth", image: require("./assets/earth.png") },
    ],
    correctAnswerId: 2,
  },
  {
    question: "Fill in the blank: 'मैं _____ हूँ। (I am a student)'",
    correctAnswer: "छात्र", // 'Student' in Hindi
  },
  {
    question: "What does this word mean: 'खुश'?",
    options: [
      { id: 1, text: "Sad", image: require("./assets/sad.png") },
      { id: 2, text: "Happy", image: require("./assets/happy.png") },
      { id: 3, text: "Angry", image: require("./assets/angry.webp") },
      { id: 4, text: "Tired", image: require("./assets/tired.webp") },
    ],
    correctAnswerId: 2,
  },
  {
    question: "What does this word mean: 'सूरज'?",
    options: [
      { id: 1, text: "Moon", image: require("./assets/moon.png") },
      { id: 2, text: "Sun", image: require("./assets/sun.png") },
      { id: 3, text: "Star", image: require("./assets/star.png") },
      { id: 4, text: "Cloud", image: require("./assets/cloud.webp") },
    ],
    correctAnswerId: 2,
  },
];

export default quizData;

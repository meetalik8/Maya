import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Sample data for Hindi characters
const hindiData = [
  { character: 'अ', pronunciation: 'a' },
  { character: 'आ', pronunciation: 'aa' },
  { character: 'इ', pronunciation: 'i' },
  { character: 'ई', pronunciation: 'ii' },
  { character: 'उ', pronunciation: 'u' },
  { character: 'ऊ', pronunciation: 'oo' },
  { character: 'ऍ', pronunciation: 'ae' },
  { character: 'ओ', pronunciation: 'o' },
  { character: 'औ', pronunciation: 'au' },
  { character: 'अं', pronunciation: 'am' },
  { character: 'अः', pronunciation: 'ah' },
  // Add more characters here
];

const HindiFlashcards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
      <Text style={styles.navIcon}>☰</Text>
        <Image 
          source={require('../assets/logo-nobg.png')} // Adjust the path to your logo
          style={styles.logo} 
        />
      </View>

      <Text style={styles.title}>Hindi Alphabets</Text>
      <View style={styles.flashcardContainer}>
        {hindiData.map((item, index) => (
          <View key={index} style={styles.flashcard}>
            <Text style={styles.character}>{item.character}</Text>
            <Text style={styles.pronunciation}>{item.pronunciation}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    top: 0,
  },
  navIcon: {
    fontSize: 24,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3884fd', // Blue shade for the title
    marginTop: 60, // Adjusted margin for spacing below navbar
    marginBottom: 20,
  },
  flashcardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows cards to wrap to the next line
    justifyContent: 'space-between', // Space between cards
    width: '100%',
  },
  flashcard: {
    width: '30%', // Set width to 30% for 3 cards in a row
    height: 150,
    backgroundColor: '#F2D16A', // Background color
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  character: {
    fontSize: 48, // Large font for Hindi character
    fontWeight: 'bold',
    color: '#000',
  },
  pronunciation: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#000',
  },
});

export default HindiFlashcards;
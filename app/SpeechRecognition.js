import React, { useState } from 'react';
import { View, Button, Text, Alert, StyleSheet, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av'; // For recording audio
import axios from 'axios';
import DeviceInfo from 'react-native-device-info'; // Ensure you install react-native-device-info

export default function SpeechRecognitionScreen() {
  const [recording, setRecording] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [randomSentence, setRandomSentence] = useState('');

  const sentences = [
    "यह एक परीक्षण वाक्य है।",
    "आपका नाम क्या है?",
    "मौसम बहुत अच्छा है।",
    "आपका दिन कैसा गुजर रहा है?",
    "हिंदी बोलना सीखना बहुत मजेदार है।"
  ];

  const getRandomSentence = () => {
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    setRandomSentence(sentence);
  };

  const getServerUrl = () => {
    if (Platform.OS === 'android') {
      return DeviceInfo.isEmulator() ? 'http://10.0.2.2:8000/analyze_audio/' : 'http://192.168.x.x:8000/analyze_audio/';
    } else {
      return 'http://localhost:8000/analyze_audio/';
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      const { status } = await Audio.getPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access microphone is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    await sendAudio(uri); // wait for audio sending to complete
  };

  const sendAudio = async (uri) => {
    const formData = new FormData();
    const fileInfo = await FileSystem.getInfoAsync(uri);

    formData.append('file', {
      uri: fileInfo.uri,
      name: 'audio.wav',
      type: 'audio/wav',
    });

    try {
      const response = await axios.post(getServerUrl(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTranscription(response.data.transcription);
      Alert.alert('Transcription Result', `Sentence: ${randomSentence}\nTranscription: ${response.data.transcription}`);
    } catch (error) {
      console.error('Error sending audio', error);
      Alert.alert('Error', 'Failed to send audio for transcription.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Random Sentence" onPress={getRandomSentence} />
      <Text style={styles.sentence}>{randomSentence}</Text>

      <Button title={recording ? "Stop Recording" : "Start Recording"} onPress={recording ? stopRecording : startRecording} />
      <Text style={styles.transcription}>{transcription}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sentence: {
    fontSize: 18,
    margin: 20,
    textAlign: 'center',
  },
  transcription: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

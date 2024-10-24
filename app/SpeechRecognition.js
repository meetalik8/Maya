import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Appbar } from 'react-native-paper';

const SpeechRecognition = () => {
    const [recording, setRecording] = useState(null);
    const [response, setResponse] = useState(null);
    const [randomSentence, setRandomSentence] = useState("");

    const hindiSentences = [
        "आपका नाम क्या है?",
        "मैं ठीक हूँ, धन्यवाद!",
        "आप कैसे हैं?",
        "आज मौसम बहुत अच्छा है।",
        "आपका दिन कैसा था?",
        "क्या आप चाय पीना चाहेंगे?",
        "मैं भारतीय भोजन पसंद करता हूँ।",
        "आप कहाँ से हैं?",
        "यहाँ बहुत सारे लोग हैं।",
        "क्या आपको यात्रा करना पसंद है?"
    ];

    const getRandomSentence = () => {
        const randomIndex = Math.floor(Math.random() * hindiSentences.length);
        setRandomSentence(hindiSentences[randomIndex]);
    };

    useEffect(() => {
        getRandomSentence();
        requestMicrophonePermission();
    }, []);

    const requestMicrophonePermission = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission required", "Please enable microphone access to use this feature.");
            console.error("Microphone permission not granted.");
        } else {
            console.info("Microphone permission granted.");
        }
    };

    const startRecording = async () => {
        try {
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.info("Recording started.");
        } catch (error) {
            Alert.alert("Error", "Failed to start recording: " + error.message);
            console.error("Error starting recording:", error);
        }
    };

    const stopRecording = async () => {
        if (!recording) return;
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.info("Recording stopped, URI:", uri);
        await checkPronunciation(uri);
    };

    const checkPronunciation = async (uri) => {
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            name: 'recording.wav',  // Ensure you use the correct file extension
            type: 'audio/wav',      // Ensure the correct MIME type
        });
    
        try {
            const res = await fetch('http://127.0.0.1:8000/check-pronunciation/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Error ${res.status}: ${errorData.message || 'Failed to check pronunciation'}`);
            }
    
            const data = await res.json();
            console.log('Server response:', data);
            setResponse(data);
        } catch (error) {
            Alert.alert("Error", "Could not connect to the server: " + error.message);
            console.error("Error checking pronunciation:", error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Let's check your pronunciation" />
            </Appbar.Header>
            <View style={styles.sentenceContainer}>
                <Text style={styles.sentenceText}>{randomSentence}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startRecording}>
                    <Text style={styles.buttonText}>Start Recording</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { opacity: !recording ? 0.5 : 1 }]} onPress={stopRecording} disabled={!recording}>
                    <Text style={styles.buttonText}>Stop Recording</Text>
                </TouchableOpacity>
            </View>
            {response && (
                <View style={styles.responseContainer}>
                    <Text style={styles.responseText}>Recognized Text: {response.recognized_text}</Text>
                    <Text style={styles.responseText}>Accuracy: {response.accuracy}%</Text>
                    <Text style={styles.responseText}>Feedback: {response.feedback}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    sentenceContainer: {
        marginBottom: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sentenceText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
        backgroundColor: '#3884fd',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    responseContainer: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#e0f7fa',
    },
    responseText: {
        fontSize: 16,
        color: '#00796b',
    },
});

export default SpeechRecognition;

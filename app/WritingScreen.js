import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const WritingScreen = () => {
    const [inputText, setInputText] = useState('');
    const [response, setResponse] = useState(null);

    const checkGrammar = async () => {
        console.info("Checking grammar for input text:", inputText);
        try {
            const res = await fetch('http://127.0.0.1:8000/check-grammar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: inputText }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Error ${res.status}: ${errorData.detail || 'Failed to check grammar'}`);
            }

            const data = await res.json();
            console.info("Grammar check response:", data);
            setResponse(data);
        } catch (error) {
            Alert.alert("Error", "Could not connect to the server: " + error.message);
            console.error("Error checking grammar:", error);
        }
    };    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Grammar Check</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your sentence in Hindi"
                onChangeText={setInputText}
                value={inputText}
            />
            <TouchableOpacity style={styles.button} onPress={checkGrammar}>
                <Text style={styles.buttonText}>Check Grammar</Text>
            </TouchableOpacity>
            {response && (
                <View style={styles.responseContainer}>
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
        backgroundColor: '#f9f9f9', // Light background color
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333', // Darker text color
    },
    input: {
        height: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF', // Primary color for the button
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    responseContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e0f7fa', // Light blue background for response
        borderRadius: 8,
    },
    responseText: {
        fontSize: 16,
        color: '#00796b', // Darker text color for responses
    },
});

export default WritingScreen;

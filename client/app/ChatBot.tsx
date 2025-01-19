import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { sendMessage } from "../api";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<
    { text: string; type: "user" | "chatbot" }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, type: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to backend and retrieve response
      const chatbotResponse = await sendMessage(input);
      console.log("Chatbot response:", chatbotResponse); // Log the response

      // Only proceed if a valid response was returned
      if (chatbotResponse) {
        const chatbotMessage = {
          text: chatbotResponse, // Adjusted to directly use chatbot response text
          type: "chatbot",
        };
        setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
      } else {
        // Handle case where response is not as expected
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error: No valid response received.", type: "chatbot" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: Unable to get a response.", type: "chatbot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.type === "user"
                ? styles.userMessage
                : styles.chatbotMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.type === "user" ? styles.userText : styles.chatbotText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={isLoading}
        >
          <Text style={styles.sendButtonText}>
            {isLoading ? "Sending..." : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
  },
  chatbotMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f2d16a",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#000",
  },
  chatbotText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChatScreen;

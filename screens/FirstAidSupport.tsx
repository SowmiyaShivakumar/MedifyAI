// App.js - React Native Frontend
import  Ionicons  from 'react-native-vector-icons/MaterialCommunityIcons';
// App.js - React Native Frontend
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// API Configuration - Update with your server's address
const API_URL = 'http://192.168.65.178:5255'; // Use this for Android emulator
// For iOS simulator use: 'http://localhost:5000'
// For real devices, use your computer's IP address

const FirstAidSupport = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hi there! I\'m your 24/7 First Aid Support assistant. How can I help you with your health concerns today?',
      sender: 'bot',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        // Handle error
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          text: `Sorry, I encountered an error: ${data.error || 'Unknown error'}`,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Network error. Please check your connection and try again.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: { id: string; text: string; sender: string } }) => {
    const isBot = item.sender === 'bot';
    return (
      <View
        style={[
          styles.messageBubble,
          isBot ? styles.botBubble : styles.userBubble,
        ]}
      >
        <Text style={[styles.messageText, isBot ? null : styles.userMessageText]}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#1E88E5" barStyle="light-content" /> */}
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>24/7 First Aid Support </Text>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ DISCLAIMER: This is an AI assistant, not a substitute for professional medical advice.
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current && flatListRef.current.scrollToEnd({ animated: true })}
      />

      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#1E88E5" />
          <Text style={styles.loaderText}>Thinking deeply...</Text>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your health question..."
            placeholderTextColor="#9E9E9E"
            multiline
        />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5F7FB',
  },
  header: {
    backgroundColor: '#38b2b4',
    padding: 16,
    // alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  disclaimer: {
    backgroundColor: '#FFECB3',
    padding: 8,
    borderRadius: 4,
    margin: 8,
  },
  disclaimerText: {
    color: '#5D4037',
    fontSize: 12,
    textAlign: 'center',
  },
  messageList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  botBubble: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#1E88E5',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#424242',
  },
  userMessageText: {
    color: 'white',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  loaderText: {
    marginLeft: 8,
    color: '#616161',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#424242',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
});

export default FirstAidSupport;

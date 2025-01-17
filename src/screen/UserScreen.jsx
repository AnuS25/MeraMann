import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const AppHome = () => {
  const navigation = useNavigation();

//   const Mood = require('https://mentalapp-backend.onrender.com/moods');
// const saveMood = async (userId, mood, note = '') => {
//   try {
//     const newMood = new Mood({ userId, mood, note });
//     await newMood.save();
//     console.log('Mood saved:', newMood);
//   } catch (error) {
//     console.error('Error saving mood:', error);
//   }
// };
// const saveMood = async (userId, mood, note = '') => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         alert('User is not logged in!');
//         navigation.navigate('LOGIN');
//         return;
//       }
//       const response = await axios.post("https://mentalapp-backend.onrender.com/moods",  {
//         // method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
      
//         body: JSON.stringify({userId, mood, note }),
//       });
//       const responseText = await response.text(); // Get response as text 
//       console.log('Response Status:', response.status); 
//       console.log('Response Text:', responseText);

//       if (response.ok) {
//         alert('Mood saved successfully!');
//       } else {
//         alert(`Failed to save mood: ${responseText}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
const saveMood = async ( mood, note = '') => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
  alert('User is not logged in!');
  navigation.navigate('LOGIN');
  return;
}
//       const userId = await AsyncStorage.getItem('userId'); // Get userId from AsyncStorage
//     if (!userId) {
//       alert('User ID is missing!');
//       // Navigate to the login screen if userId is missing
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'LOGIN' }],
//       });
//       return;
//     }
//  console.log('Sending mood data:', { userId, mood, note });
    // Send POST request
    const response = await axios.post(
      "https://mentalapp-backend.onrender.com/moods",
      {  mood, note },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    if (response.status === 200) {
      alert('Mood saved successfully!');
    } else {
      alert(`Failed to save mood: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while saving the mood.');
  }
};

  

 const handleEmojiClick = async (mood) => {
  
  try {
    // Get the user ID from AsyncStorage or wherever it's stored
//     const token = await AsyncStorage.getItem('userId');
//     if (!token) {
//       alert('User ID is missing!');
//       //navigation.navigate('LOGIN');
//       navigation.reset({
//   index: 0,
//   routes: [{ name: 'LOGIN' }],
// });
// //navigation.replace('LOGIN');
//       return;
//     }

    // Call saveMood with proper parameters
    await saveMood(mood);  // Pass the correct userId and mood
  } catch (error) {
    console.error('Error during emoji click:', error);
  }
};


  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#B0B0B0"
      />

      {/* Greeting Section */}
      <Text style={styles.greetingText}>Hey Anisha Sailoni</Text>
      <Text style={styles.subText}>How are you feeling?</Text>
      <Text style={styles.subTextSmall}>Identify and track your emotions</Text>

      {/* Emotion Tracker */}
      <View style={styles.emotionTracker}>
        {["😡", "😟", "😐", "😊", "😌"].map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => handleEmojiClick(emoji)}>
            <Text style={styles.emotion}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task Section */}
      <Text style={styles.sectionTitle}>Calm the mind</Text>
      <Text style={styles.subText}>1 of 6 tasks completed</Text>
      <View style={styles.taskList}>
        <TouchableOpacity style={styles.taskCard}>
          <Text style={styles.taskTitle}>Set goals</Text>
          <Text style={styles.taskStatus}>✔ Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskCard}>
          <Text style={styles.taskTitle}>Take the Personal Insights Quiz</Text>
          <Text style={styles.taskDuration}>⏱ 5-7 min</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.showAllButton}>
        <Text style={styles.showAllText}>Show all</Text>
      </TouchableOpacity>

      {/* Continue Your Journey */}
      <Text style={styles.sectionTitle}>Continue your journey</Text>
      <Text style={styles.subText}>See the progress of your journey</Text>
      <View style={styles.journeyCards}>
        <TouchableOpacity style={styles.journeyCard}>
          <Text style={styles.cardTitle}>Start your Journey</Text>
          <Text style={styles.cardSubtitle}>0/2 sessions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.journeyCard}>
          <Text style={styles.cardTitle}>Learning Path</Text>
        </TouchableOpacity>
      </View>

      {/* Rescue Sessions */}
      <Text style={styles.sectionTitle}>Rescue sessions</Text>
      <Text style={styles.subText}>Quick 3-5 min sessions for difficult emotions</Text>
      <TouchableOpacity style={styles.sessionCard}>
        <Text style={styles.cardTitle}>Need help with a rough day?</Text>
        <Text style={styles.cardSubtitle}>Gain relief in 3-5 min</Text>
        <TouchableOpacity style={styles.sessionButton}>
          <Text style={styles.sessionButtonText}>Start session</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Guided Journals */}
      <Text style={styles.sectionTitle}>Guided journals</Text>
      <Text style={styles.subText}>100% encrypted - your safe writing space</Text>
      <TouchableOpacity style={styles.journalCard}>
        <Text style={styles.cardTitle}>Want clarity of mind?</Text>
        <Text style={styles.cardSubtitle}>Guided journals help with reflection</Text>
        <TouchableOpacity style={styles.journalButton}>
          <Text style={styles.journalButtonText}>Start journal</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f7f4",
    paddingHorizontal: 16,
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 16,
    fontSize: 16,
    color: "#000",
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000",
  },
  subText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  subTextSmall: {
    fontSize: 14,
    color: "#888",
  },
  emotionTracker: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  emotion: {
    fontSize: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
  },
  taskList: {
    marginVertical: 8,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    color: "#000",
  },
  taskStatus: {
    fontSize: 14,
    color: "#888",
  },
  taskDuration: {
    fontSize: 14,
    color: "#888",
  },
  showAllButton: {
    alignItems: "center",
    marginVertical: 8,
  },
  showAllText: {
    fontSize: 16,
    color: "#007BFF",
  },
  journeyCards: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  journeyCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
  },
  sessionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    alignItems: "center",
  },
  sessionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  journalCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  journalButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    alignItems: "center",
  },
  journalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AppHome;

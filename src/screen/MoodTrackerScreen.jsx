import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodHistory = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          alert('User is not logged in!');
          return;
        }

        const response = await axios.get('https://mentalapp-backend.onrender.com/moods/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMoodHistory(response.data.moodHistory);  // Update state with fetched mood history
        setLoading(false);  // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching mood history:', error);
        setLoading(false);
      }
    };

    fetchMoodHistory();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mood History</Text>
      {moodHistory.length === 0 ? (
        <Text>No mood history found.</Text>
      ) : (
        moodHistory.map((item, index) => (
          <View key={index} style={styles.moodCard}>
            <Text style={styles.mood}>{item.mood}</Text>
            {item.note && <Text style={styles.note}>{item.note}</Text>}
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f4',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  moodCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mood: {
    fontSize: 28,
  },
  note: {
    fontSize: 16,
    color: '#555',
    marginVertical: 8,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
});

export default MoodHistory;
